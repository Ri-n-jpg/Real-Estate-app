import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
export const signup=async(req,res,next)=>{
     const {username,email,password}=req.body;
     const hashedPassword=bcrypt.hashSync(password,10);
     const newUser=new User({username,email,password:hashedPassword});
   try{

     await newUser.save();
     console.log("✅ New User Created:", newUser);
     res.status(201).json("User created succesfully");}
     catch (error){
     next(errorHandler(500,'error from the funtion'));
     }

}