import mealSchema from "../models/mealSchema.js"
// Import Cloudinary
import cloudinary from "cloudinary";
import dotenv from "dotenv";
// import { runInNewContext } from "vm";
dotenv.config();

export default {
    // getAll: async (req, res) => {
    //     try{

    //     }catch(error){
    //         console.log(error)
    //     }
    // },

    createMeal: async (req, res) => {
        try{
            const {category, title, notes, userID} = req.body
            if ( !title || !userID || !category || !req.file) {
                return res.status(400).json({ message: "Missing required fields" });
            }

             // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            const  newMeal= await mealSchema.create({
                image: result.secure_url, // Use the secure URL provided by Cloudinary
                category: category,
                title: title,
                notes: notes,
                userID: userID,

            })
            console.log(newMeal)
            res.status(201).json(newMeal);
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // deleteMeal: async (req, res) => {
    //     try{

    //     }catch(error){
    //         console.log(error)
    //     }
    // },

    // updateMeal: async (req, res) => {
    //     try{

    //     }catch(error){
    //         console.log(error)
    //     }
    // },
    
    // addImage: async (req, res) => {
    //     try{

    //     }catch(error){
    //         console.log(error)
    //     }
    // },

    // deleteImage: async (req, res) => {
    //     try{

    //     }catch(error){
    //         console.log(error)
    //     }
    // },
}