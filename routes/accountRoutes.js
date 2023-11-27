import express from 'express'
const router = express.Router();
import { getDistinctProduct } from '../controllers/accountController.js'

// router.use('/active')
router.get('/getDistinctProduct',getDistinctProduct)

export default router