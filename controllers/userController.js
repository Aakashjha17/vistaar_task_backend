import userModel from '../models/user.js'
import passport from 'passport';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config()

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: process.env.callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if the user already exists in the database
            const existingUser = await userModel.findOne({ email: profile.emails[0].value });
            if (existingUser) {
                // User already exists, proceed with authentication
                return done(null, existingUser);
            }

            // User does not exist, create a new user in the database
            const newUser = new userModel({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: 'signed via through google', // No password needed for OAuth users
                phone: 0, // Set a default value for phone if needed
            });

            await newUser.save();
            done(null, newUser);
        } catch (error) {
            done(error, null);
        }
        }
    )
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Express route handler for Google OAuth
export const googleAuthHandler = (req, res, next) =>{
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

// Express callback route after Google OAuth
export const googleAuthCallbackHandler = (req, res, next) =>{
    passport.authenticate('google', async (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Authentication failed
            return res.redirect('/login');
        }

        try {
            // Generate a JWT token
            const token = jwt.sign({ userID: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '5D' });

            // Store the token in the user's session or as a cookie
            const userData = {
                _id: user._id,
                email: user.email,
                name: user.name,
                token: token,
            };
            res.cookie('userInfo', JSON.stringify(userData));
            

            // Redirect to the dashboard with the token
            res.redirect(`http://localhost:3000/`);
        } catch (error) {
            next(error);
        }
    })(req, res, next);
}