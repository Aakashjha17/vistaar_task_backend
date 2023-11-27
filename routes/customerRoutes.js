import express from 'express'
const router = express.Router();
import { getActiveCustomer } from '../controllers/customerController.js'

// router.use('/active')
router.get('/active',getActiveCustomer)

export default router