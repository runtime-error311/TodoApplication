import { decryptData } from "../services/encryptionServices.js";

export const decryptMiddleware = (req,res,next)=>{
 try{
   if(req.body.data){
     req.body = decryptData(req.body.data);
   }

   next();

 }catch(err){

   return res.status(400).json({
     message:"Invalid encrypted payload"
   })

 }

}