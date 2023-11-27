import Usertransactions from '../models/transactions.js'

export const getTransactionsByAccount  = async (req,res) => {
    try{
        const data = await Usertransactions.find({"account_id":req.body.account_id})
        console.log(req.body.account_id)
        if(!data){
            return res.status(404).json({success:false,message:"No transactions linked to this Account"})
        }
        return res.status(200).json({success:true,"data":data})
    }catch(error){
        return res.status(500).json({success:false,message:"server error"})
    }
}

export const getAccountIdWithTransactionLimit  = async (req,res) => {
    try{
        const data = await Usertransactions.find({'transactions.amount': { $lt: 5000 }})
        if(!data){
            return res.status(404).json({success:false,message:"No Account found"})
        }
        const accountIds = data.map(item => item.account_id);
        return res.status(200).json({success:true,"data":accountIds})
    }catch(error){
        return res.status(500).json({success:false,message:"server error"})
    }
}