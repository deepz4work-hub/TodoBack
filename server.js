//import express package
const express=require('express');
//import dotenv package to manage environment variables
const dotenv=require('dotenv');
//configure dotenv to load variables from .env file
dotenv.config();
//  import mongoose package for MongoDB interaction
const mongoose=require('mongoose');
//Express app initialization
const app=express();
//Import routes from external file
const alltodolist=require('./routes/alltodolist');

// CORS middleware to allow frontend requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

//Middleware to parse JSON request bodies with size limit
app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

//Use the imported routes for handling requests to /api/todos
app.use('/api/todolist/',alltodolist);
//Define PORT (default changed to 4001)
const PORT = process.env.PORT || 4001;
//Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URI)
.then(()=>app.listen(PORT,()=>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints available at http://localhost:${PORT}/api/todolist`);
}))
.catch((err)=>console.log(err));

//Routes http://localhost:3000/
app.get('/',(req,res)=>{
    res.json({msg:'Hello World'});
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: 'Route not found',
        error: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    
    // Mongoose validation error
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
            success: false,
            msg: 'Validation Error',
            errors: errors
        });
    }
    
    // Mongoose cast error (invalid ObjectId)
    if (error.name === 'CastError') {
        return res.status(400).json({
            success: false,
            msg: 'Invalid ID format',
            error: error.message
        });
    }
    
    // MongoDB duplicate key error
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(409).json({
            success: false,
            msg: 'Duplicate field value',
            error: `${field} already exists`
        });
    }
    
    // JSON parsing error
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid JSON format',
            error: 'Please check your request body syntax'
        });
    }
    
    // Default server error
    res.status(error.status || 500).json({
        success: false,
        msg: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
    });
});
