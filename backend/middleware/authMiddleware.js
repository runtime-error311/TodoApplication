import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = async(req,res,next)=>{
    try{    
        const {token} = req.cookies;
        if(!token) {
            return res.status(401).json({
                message:"Unauthorized User"
            })
        }

        const {id} = jwt.verify(token,JWT_SECRET);
        req.userId = id;
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid or expired token"
        })
    }
}

export const sessionAuthMiddleware = async(req,res)=>{
    try{
        const {userId} = req.session;
        if(!userId){
            return res.status(401).json({
                message:"Unauthorized User!"
            })
        }
        next();
    }
    catch(err){
        
        return res.status(401).json({
            message:"Invalid or expired token"
        })
    }
}

export default authMiddleware;