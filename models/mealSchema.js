import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    image: {
        type: String,
    },

    category: {
        type: String,
        required: true,
    },

    title: {
        type: String,
    },

    notes: {
        type: String,
        required: true,
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
       },
    
    day: {
        type: String,
        required: true,
    }
    

})

export default mongoose.model("meals", mealSchema)