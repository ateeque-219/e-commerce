const express = require("express");

const app = express()


app.get('/',(req,res)=>{
 res.send({
    message : "welcome to my website" ,
 });
});

const port = 8080,

app.listen()