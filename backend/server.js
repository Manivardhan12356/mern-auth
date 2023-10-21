import express from "express";
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';


dotenv.config()
const port = process.env.PORT || 5000
connectDB();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
   res.send("iam runing")
})



app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`running on port ${port}`));


