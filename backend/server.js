import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'  
// import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/user",userRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});