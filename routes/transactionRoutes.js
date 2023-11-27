import express from 'express'
const router = express.Router();
import { getTransactionsByAccount,getAccountIdWithTransactionLimit} from '../controllers/transactionsController.js'


router.post('/getTransactionsByAccount',getTransactionsByAccount)
router.get('/getAccountIdWithTransactionLimit',getAccountIdWithTransactionLimit)

export default router