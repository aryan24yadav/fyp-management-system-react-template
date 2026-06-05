import express from "express";
import cors from "cors";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import authRouter from "./router/userRoutes.js";

config();
const app = express();

/// ye connection banata hai frontend and backend ke beech
/// origin: [process.env.FRONTEND_URL] -> ye frontend ka url hai 
/// methods:["GET","POST","PUT","DELETE"] -> ye methods hai 
/// credentials:true -> ye credentials hai 
/// ye middleware hai 
app.use(
    cors(
    {
        origin: [process.env.FRONTEND_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
));

/// express.json() -> ye frontend se aane wale data ko parse karta hai 
/// express.urlencoded({extended:true}) -> ye frontend se aane wale data ko parse karta hai  // form data ko parse karta hai 
/// cookieParser() -> ye frontend se aane wale cookies ko parse karta hai 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 

app.use("/api/v1/auth",authRouter);
/// sabse last me error middleware ko use karna hai 
app.use(errorMiddleware);

export default app;