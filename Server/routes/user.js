import express from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }
  const hashpassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });
  await newUser.save();
  return res.json({ status: true, message: "User created successfully" });
});
router.get("/all",async(req,res)=>{
  const x=await User.find({});
  // console.log(x)
  return res.json({
    users:x
  })
}  )
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
   
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "No such user exists" });
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.json({ message: "Password is incorrect" });
  }
  const token = jwt.sign({ username: user.username }, process.env.JWTSECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, message: "User logged in successfully" });
});

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) { 
      return res.json({ message: "No such user exists" });
    }
    const token=jwt.sign({id: user._id},process.env.JWTSECRET,{expiresIn:'5m'});
    var transporter = nodemailer.createTransport({
      service: "gmail",
      // auth: {
      //   user: "appy.dhoni@gmail.com",
      //   // pass: "hqqz lodx xydu srye",
      // },
      auth: {
        user: "aishwarytutorial@gmail.com",
        pass:"rdiiditlabluheqi"
      },
    });
    var mailOptions = {
        from: 'aishwarytutorial@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: `http://localhost:5173/resetPassword/${token}`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return res.json({ message: "Error sending mail" });
        } else {
         return res.json({status: true , message: "Email sent successfully"})
        }
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/resetpassword/:token", async (req, res)=>{
  const {token} =req.params;
  const { password } = req.body;
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    const id=decodedToken.id;
    const hashpassword =await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({_id: id},{ password : hashpassword})
    return  res.json({status:true,message:"Password reset successfully"});
 
  }catch(error){
    return  res.json({message:"Invalid Token"});
  }

});

const verifyuser = async (req, res, next) => {
  try{
    const token =req.cookies.token;
    if(!token){
     return res.json ({status:false,message:"No Token Found"})
    }
    const decoded= await jwt.verify(token, process.env.JWTSECRET);
    if(decoded){
      next();
    }
    else{
      return res.json ({status:false,message:"Token Unauthorized"})

    }
    
  
     
}catch(error){
  return res.json(error);
}}

router.get('/verify', verifyuser , async (req,res) => {
 
  return res.json({status: true,message:"User Verified Successfully"})

});

router.get('/logout', (req, res)=>{   
    
  
        res.clearCookie('token'); 
    
    return res.json({status: true , message:"User Logged Out Successfully"})})

export default router;
