const express = require("express");
const bcrypt = require("bcrypt");
const {UserModel}= require("../models/user.model")
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name, pass, email} = req.body;
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.status(200).json({error:err})
            }else{
                const user = new UserModel({name,pass:hash,email})
                await user.save();
                res.status(200).json({msg:"New user register !",user:user})
            }
        })
    }catch(err){
        res.json({err})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email});

        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token = jwt.sign({userID:user._id,user:user.name},"prits")

                res.json({msg:"Login successful",user,token})
            }else{
                res.json({msg:"Wrong email and password"})
            }
        })  
    }catch(err){
        res.json({error:err})
    }
})

module.exports={
    userRouter
}