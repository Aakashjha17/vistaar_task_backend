import AccountModel from '../models/accounts.js'

export const getDistinctProduct = async (req,res) => {
    try{
        const data  = await AccountModel.distinct('products')
        if(!data){
            return res.status(404).json({success:false,message:"No products found"})
        }
        return res.status(200).json({success:true,"data":data})
    }catch (error){
        return res.status(500).json({success:false,message:"server error"})
    }
}