import express from "express";
const app = express();
import mongoose from "mongoose";
import  cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./routes/authRoute.js";

import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(['1.1.1.1', '8.8.8.8']);

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);

app.get("/" , (req ,res)=>{
    res.send("PONG");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

const DB_URL = process.env.DBURL;

const dbConnection = async()=>{
    try{
        await mongoose.connect(DB_URL)
        .then((e)=>{
             console.log("Database connected successfully");
        }).catch((err)=>{
            console.log("then. Databse error " , err);
        })
       
    }catch(error){
        console.log("databse connection failed ", error );
    }
    
}

dbConnection();