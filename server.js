const env=require('dotenv');
env.config();

const PORT=process.env.PORT||4001;

const express= require('express');
const app=express();

const mongoose= require("mongoose");
const todoRoutes= require('./routes/alltodolist');

app.use(express.json());

app.use('api/todolisst',todoRoutes);

mongoose.connect(process.env.MONGO_URI,()=>{
    console.log("connected to MongoDB");
})