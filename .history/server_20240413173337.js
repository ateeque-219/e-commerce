import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors

dotenv.config();

connectDB();

const app = express()
 
app.use(corse())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded)

app.get('/',(req,res)=>{
 res.send({
    message : "welcome to my website" ,
 });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})