import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors"
import cookieParser from 'cookie-parser';
import router from './routes/user.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));
app.use(cookieParser());

app.use('/auth',router);
const port=process.env.PORT || 8000;

const mongoURI = process.env.MONGO_URL;
if (!mongoURI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to DB:", err));


app.listen( port , () => {
    console.log("Server is running ")   
});

