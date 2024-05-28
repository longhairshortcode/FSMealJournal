import express from "express"
const router = express.Router()
import mealController from "../controllers/mealController.js"
import multer from "multer";
import path from "path";

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        if (file && file.originalname){
            cb(null, "image" + "_" +  Date.now() + path.extname(file.originalname));
        }else{
            cb(new Error(
                "invalid file object"
            ))
        }          
    }
});

  // Set up Multer upload options
const upload = multer({ storage: storage });

// Routes with file upload middleware
//http://localhost:2121/meal/create-meal
router.post("/create-meal", upload.single("file"), mealController.createMeal);
// router.post("/add-image", upload.single("image"), mealController.addImage);

//http://localhost:2121/meal/get-all/:id
// router.get("/get-all/:id", mealController.getAll)

//http://localhost:2121/meal/create-meal
// router.post("/create-meal", mealController.createMeal)

//http://localhost:2121/meal/delete-meal/:id
// router.delete("/delete-meal/:id", mealController.deleteMeal)

//http://localhost:2121/meal/update-meal/:id
// router.put("/update-meal/:id", mealController.editMeal)

//http://localhost:2121/meal/add-image
// router.post("/add-image", mealController.addImage)

//http://localhost:2121/meal/delete-image/:id
// router.delete("/delete-image/:id", mealController.deleteImage)


const mealRoutes = router
export default mealRoutes

