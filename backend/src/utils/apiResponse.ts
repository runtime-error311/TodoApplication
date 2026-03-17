import { Response } from "express";

export const successResponse = <T>(res:Response, statusCode:number, data:T|null, message:string) => {
  return res.status(statusCode).json({
    success:true,
    message,
    data,
  });
};

export const errResponse = (res:Response,statusCode:number,message:string)=>{
    return res.status(statusCode).json({
        success:false,
        message,
    })
}
