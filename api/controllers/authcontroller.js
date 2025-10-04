import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
export const signup=async(req,res)=>{
     const {username,email,password}=req.body;
     const hashedPassword=bcrypt.hashSync(password,10);
     const newUser=new User({username,email,password:hashedPassword});
   try{

     await newUser.save();
     console.log("✅ New User Created:", newUser);
     res.status(201).json("User created succesfully");}
     catch (error){
          res.status(500).json(error.message);
     }

}