import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URI = process.env.MONGO_URI;
if (!SESSION_SECRET) {
    throw new Error("SESSION_SECRET is required!");
}
if (!MONGO_URI) {
    throw new Error("MONGO_URI is required!");
}
const sessionMiddleware = () => {
    const options = {
        name: "sid",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
        }),
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
    };
    return session(options);
};
export default sessionMiddleware;
//# sourceMappingURL=session.js.map