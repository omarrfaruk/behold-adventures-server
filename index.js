import express from "express"
import mongoose from "mongoose";
import cors from 'cors'
import morgan from "morgan";
import userRouter from './routes/user.js';
import tourRouter from './routes/tour.js';

const app = express();

app.use(morgan('dev'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())


app.use('/users', userRouter)
app.use('/tour', tourRouter)

const MONGODB_URL = 'mongodb+srv://behold_adventure:gReWqt3A2jHXxymD@cluster0.9fxpq.mongodb.net/tour_db?retryWrites=true&w=majority'

const port = 5000;
//behold_adventure
//gReWqt3A2jHXxymD
//mongodb+srv://behold_adventure:<password>@cluster0.9fxpq.mongodb.net/?retryWrites=true&w=majority



mongoose.connect(MONGODB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    })
    .catch(err => console.log(`${err} did not connect`))

