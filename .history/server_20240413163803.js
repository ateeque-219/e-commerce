import express from "express";
import dotenv from "dotenv";


dotenv.config();


const app = express()


app.get('/',(req,res)=>{
 res.send({
    message : "welcome to my website" ,
 });
});

const PORT = process.env

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})