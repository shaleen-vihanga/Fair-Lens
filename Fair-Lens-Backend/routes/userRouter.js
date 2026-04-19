import express from 'express';
import { createUser, deleteUser, getUser, loginUser, updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/',getUser);

userRouter.post('/',createUser);
userRouter.post("/login",loginUser)

userRouter.delete('/',deleteUser);

userRouter.put('/',updateUser);

export default userRouter;