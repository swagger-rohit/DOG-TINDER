import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from './connection.js';
import userRouter from './Rourter/userRouter.js';  // Import the router

dotenv.config();

const URL = "mongodb://localhost:27017/";
connectMongoDB(URL);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000', 'https://burger-shop-mauve.vercel.app','https://burger-shop-1.onrender.com/product'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));


app.use('/', userRouter);  // Use the user router

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
