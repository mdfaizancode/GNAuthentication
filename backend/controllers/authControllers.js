import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import oauth2Client from "../utils/googleConfig.js";

const signUp = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message: "User already exists", success: false});
        }
        const newModel = new UserModel({name , email, password});
        newModel.password = await bcrypt.hash(password, 10);
        await newModel.save();
        const jwtToken = jwt.sign(
            {email: newModel.email, id: newModel._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );
        res.status(201).json({
            message: "SignUp Successfully",
            success: true,
            jwtToken,
            user: {
                name: newModel.name,
                email: newModel.email,
                image: ""
            }
        })
    }catch(error){
        res.status(500)
        .json({message: " internal server error ", error: error.message, success : false})
    }
}

const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400)
            .json({message: "User not exists please Signup First", success: false});
        }
        const isEqual = await bcrypt.compare(password , user.password);
        if(!isEqual){
            return res.status(403)
            .json({message: "your entered password is wrong", success : false});
        }
        const jwtToken = jwt.sign(
            {email: user.email, id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200)
        .json({
             message: "Login success" ,
             success: true,
             jwtToken,
             email,
             name: user.name

            })
    }catch(error){
        console.log(error);
        res.status(500)
        .json({message: " internal server error ", success : false})
    }
}

const googleLogin = async (req,res)=>{
    try{
        const {code} = req.query;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes  = await axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
            );
            const {id: googleId, email, name, picture}  = userRes.data;
            let user = await UserModel.findOne({email});
            if(!user){
                user = await UserModel.create({
                    name, email, image: picture, googleId
                })
            }

            const {_id} = user; 
            const token = jwt.sign({_id,email}, 
                process.env.JWT_SECRET,{expiresIn: process.env.JWT_TIMEOUT}
            );
            return res.status(200).json({
                message: "Success",
                token,
                user
            })

        }catch (error){
            console.error("Google login failed:", error.message);
          res.status(500).json({
            message: "Internal Server Error",
          })
    }
}


export {signUp , login , googleLogin};