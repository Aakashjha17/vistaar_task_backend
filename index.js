import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import accountRoutes from './routes/accountRoutes.js'

dotenv.config()
const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const port = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URL

//DATABASE CONNECTION
connectDB(DATABASE_URL)

//JSON
app.use(express.json())
app.listen(port, () => {
  console.log(`server live on port: ${port}`)
})

app.use("/api",cors(), userRoutes)
app.use("/api/customer",customerRoutes)
app.use("/api/transactions",transactionRoutes)
app.use("/api/accounts",accountRoutes)