import express from 'express'
import env from "env",

const app = express()


app.get('/',(req,res)=>{
 res.send({
    message : "welcome to my website" ,
 });
});

const port = 8080

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})