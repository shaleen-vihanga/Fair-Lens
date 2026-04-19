import express from 'express';
import mongoose from 'mongoose';
// import User from './models/User.js';
// import { use } from 'react';
import userRouter from './routes/userRouter.js';

const mongoURI = "mongodb+srv://shaleenvihanga_db_user:IQpnKuXG00oatbeL@cluster0.ggpu5oi.mongodb.net/?appName=Cluster0"

const app = express();

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB Cluster');
}).catch((err) => {
    console.error('Error connecting to MongoDB Cluster:', err);
});

app.use(express.json());

app.use(
    (req, res, next) => {
        const authorizationHeader = req.header("Authorization")
        if (authorizationHeader != null) {
            const token = authorizationHeader.replace("Bearer ", "")
            jwt.verify(token, process.env.JWT_SECRET,
                (error, content) => {
                    if (content == null) {
                        res.status(401).json({
                            message: "invalid token"
                        })
                    } else {
                        req.user = content
                        next()
                    }
                }
            )
        } else {
            next()
        }
    },
)

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});