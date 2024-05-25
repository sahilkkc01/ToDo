import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

mongoose.set('strictQuery', true);

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://to-do-frontend-beta.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.error("DB Connection Error:", err);
});

// Routes
app.get('/', (req, res) => {
    res.json({ msg: "ok" });
});
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

// Start server
app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
}).on('error', (err) => {
    console.error("Server Error:", err);
});
