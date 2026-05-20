import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer  from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const foodRouter =  express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "foods",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });

foodRouter.post("/add",upload.single("image") , addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood )



export default foodRouter;