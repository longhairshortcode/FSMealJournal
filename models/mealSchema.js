import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    image: {
        type: Array,
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
       }

})

export default mongoose.model("meals", mealSchema)