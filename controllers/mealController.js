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
        console.log(req.body)
        console.log(req.file)
        try{
            const {category, title, notes, userID, day} = req.body
            const {filename} = req.file
            if ( !title || !userID || !category || !req.file || !day) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const  newMeal= await mealSchema.create({
                image: filename, 
                category: category,
                title: title,
                notes: notes,
                userID: userID,
                day: day,

            })
            // console.log(newMeal)
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