import path from 'path'
import express from "express";
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config()
const port = process.env.PORT || 5000
connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRouter);

if (process.env.NODE_ENV !== 'production') {
   const _dirname = path.resolve();
   app.use(express.static(path.join(_dirname, 'frontend/dist')));
   app.get('*',(req, res) =>res.sendFile(path.resolve(__dirname,"frontend",'dist','index.html')));
} else {
   app.get('/', (req, res) => {
      res.send("iam runing")
   })
}



app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`running on port ${port}`));


