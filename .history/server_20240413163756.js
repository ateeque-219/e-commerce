import express from "express";
import dotenv from "dotenv";


dotenv.config();


const app = express()


app.get('/',(req,res)=>{
 res.send({
    message : "welcome to my website" ,
 });
});

const POTT = 8080

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})