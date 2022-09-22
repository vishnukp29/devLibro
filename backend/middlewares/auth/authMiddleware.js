const expressAsyncHandler = require("express-async-handler");
const jwt=require('jsonwebtoken');
const User = require("../../models/user/userModel");

const authMiddleware = expressAsyncHandler(async (req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        try {
            token=req.headers.authorization.split(' ')[1]
            if(token){
                const decoded=jwt.verify(token, process.env.JWT_KEY)
                // find the user by id
                const user=await User.findById(decoded?.id).select("-password")
                // Attatch the user to the request object
                req.user=user
                next()
            }else{
                throw new Error('There is no Token attached to the Header')
            } 
        } catch (error) {
           throw new Error('Not Authorized, Login Again')
        } 
    }
    else{
        throw new Error('There is no Token attached to the Header')
    }
})

module.exports= authMiddleware