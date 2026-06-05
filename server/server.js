import {config} from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

config();
/// DATABASE CONNECTION
connectDB();

//------------------
/// start server
//-------------------
const server = app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server started on port ${process.env.PORT}`);
});

//------------------
/// Error handling 
//-------------------

/// ye error tab aayega jab database connection me error aayega 
/// or trycatch me error aayega 
/// jo request us samay hogi vo complete hogi 
/// new upcoming request nhi aayegi 
process.on("unhandledRejection",(error)=>{
    console.log(`Unhandled Rejection : ${error.message}`);
    server.close(() => process.exit(1));
});

process.on("uncaughtException",(error)=>{
    console.log(`uncaughtException: ${error.message}`);
    process.exit(1);
});

// export default server;