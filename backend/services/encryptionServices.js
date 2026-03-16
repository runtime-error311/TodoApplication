import  CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();
const CRYPTO_SECRET = process.env.CRYPTO_SECRET;

export const decryptData = (encryptedData)=>{
    try{
        
        if(!CRYPTO_SECRET){
            throw new Error("Crypto secret is required!");
        }
        const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_SECRET);
        const response = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return response;

    }
    catch(err){
        throw new Error("Decryption error is ",err)
    }

}