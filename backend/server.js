import express from "express";
import cors from "cors";
import foodRouter from "./routes/foodRoute.js";
import loginRegisterRoute from "./routes/loginRegisterRoute.js";
import orderRouter from "./routes/orderRoute.js"
import connectDB from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// connect mongoDB
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/auth",loginRegisterRoute);
app.use("/api/order", orderRouter);

app.get("/",(req,res)=>{
  res.send("API is working!")
})

app.listen(port, ()=>{
  console.log(`Server running on URL http://localhost:${port}`);
  
})
