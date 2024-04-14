import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"


dotenv.config();



connectDB();

const app = express();
 
// app.use(cors({
//     origin :process.env.CORS_ORIGIN,
//     credentials: true
// }))
// app.use(express.json())
// app.use(morgan('dev'))
// app.use(express.urlencoded)
// app.use(cookieParser)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // fixed missing parentheses
app.use(cookieParser());



app.use("/api/v1/auth",authRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})