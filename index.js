//EXPRESS
import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import bodyParser from "body-parser";
// import { v2 as cloudinary } from 'cloudinary';

dotenv.config(); 
//import routes
import userRoutes from "./routes/userRoutes.js"
import mealRoutes from "./routes/mealRoutes.js"
//EXPRESS
const app = express();

//CORS middleware library 
const allowedOrigins = ["http://localhost:5176", "http://localhost:5173", "https://remember-what-you-cooked.vercel.app" ]
//EXPRESS has use method
app.use(cors(
    {
        origin: (origin, callback) => {
            if( !origin || allowedOrigins.includes(origin)){
               callback(null, true)     
            }else {
                callback(new Error(
                    "origin not allowed by cors policy"
                ))  
            }
        }, 
        methods:["POST", "GET", "PUT", "DELETE", "PATCH", "HEAD"],
        credentials: true, 
    }
))

//json middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("public"))

// Configure Cloudinary using environment variables
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });


//routes entry point & middleware (only for routes not controllers)
app.use("/user", userRoutes)
app.use("/meal", mealRoutes)






const PORT = process.env.PORT || 3000

const MONGODB_STRING = process.env.MONGODB_STRING
const connectDB = async () => { //start asynchronous function 
    try{
        await mongoose.connect(MONGODB_STRING) // await connecting by the .connect method and the env item in ()
        app.listen(PORT, () => { //estalish port listening to
            console.log(`Connected to MongoDB and server is running on: ${PORT} `)
        })
    }catch(Error){ // if error connecting, console it and do process... to stop code from allowing server to run inconsistently 
        console.log(Error)
        process.exit(1)
    }
      
}


connectDB()