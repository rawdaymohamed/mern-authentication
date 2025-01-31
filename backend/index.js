import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json())
app.use(cookieParser()) // allows us to parse incoming cookies
app.get("/", (req, res) => { res.json({ message: "MERN Auth" }) })

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})