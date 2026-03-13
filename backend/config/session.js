import session from "express-session";
import MongoStore from "connect-mongo";

const sessionMiddleware = ()=>{
    return session({
        name:"sid",
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        store:MongoStore.create({
            mongoUrl:process.env.MONGO_URI
        }),
        cookie:{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        }
    })
}
export default sessionMiddleware;