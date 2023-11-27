import CustomerModel from '../models/customers.js'

export const getActiveCustomer = async (req,res) => {
    try{
        const data = await CustomerModel.find({"active":true})
        if(!data){
            return res.status(404).json({success:false,message:"No active Custpmer"})
        }
        return res.status(200).json({success:true,"data":data})
    }catch (error){
        return res.status(500).json({success:false,message:"server error"})
    }
}