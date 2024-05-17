import userSchema from "../models/userSchema.js"
import bcrypt from "bcrypt"
const saltRounds = 10;



export default  {

    signUp: async (req, res) => {
    try{    
        const {email, name, password} = req.body
        const existingUser = await userSchema.findOne({email})
        if (existingUser){
            return res.status(409).json({
                message: "This user already exists"
            })
        }
        if( email && name && password){
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newUser = await userSchema.create({
                email: email,
                name: name,
                password: hashedPassword
            })
        if (newUser){
            res.status(201).json({
                email: newUser.email,
                name: newUser.name,
                id: newUser._id,
                mesasge: "Account created successfully"
            })
          }
        }
    }catch(error){
        console.log(error);
        res.status(500).json("This is an ", error);
    }
    },

    login: async (req, res) => {
        const {email, password} = req.body
        const existingUser = await userSchema.findOne({email})
        if (!existingUser){
            return res.status(404).json({
                message: "This user doesn't exist"
            })
        }
        if (existingUser){
            const isPasswordValid = bcrypt.compare(password, existingUser.password)
            if(isPasswordValid){
                return res.status(200).json({
                    email: existingUser.email,
                    name: existingUser.name,
                    id: existingUser._id,
                    message: "login successful"
                })
            }else{
                return res.status()
            }
        }
    } 
}