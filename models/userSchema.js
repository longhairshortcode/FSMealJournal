import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,   
    },
    name: {
        type: String,
           
    },
    password: {
        type: String,
        required: true,   
    },
    profilePicture: {
        type: String,  
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mealJournal"
    }
})

export default mongoose.model("users", userSchema)