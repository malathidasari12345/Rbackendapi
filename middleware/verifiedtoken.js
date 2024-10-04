const Vendor = require("../models/Owner");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = async(req,res, next)=>{
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(401).json({
                success : false,
                message : "token is required"
            })
    }
    const decoded = jwt.verify(token, process.env.secretkey )
    console.log(decoded)
    const vendor = await Vendor.findById(decoded.vendorid);

    req.vendorid = vendor._id
    if(!vendor){
        return res.status(404).json({
            success : false,
            message : "vendor not found"
        })
    }
   
    next()

   }catch(error){
        return res.status(500).json({
                success: false,
                error: error.message,

        })
    }
    
}

module.exports = verifyToken;