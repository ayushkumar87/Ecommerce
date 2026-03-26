const User=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

//Signup
exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"All feilds are required"})
        }
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({
            name,
            email,
            password:hashedPassword,
            role
        })
        await user.save()
        res.status(201).json({message:"User registerd sucessfully"})

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

//Login
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({messgae:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token=jwt.sign(
            {userID:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )
        res.json({token});
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}