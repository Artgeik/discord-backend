const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const postRegister= async (req,res)=>{
    try{//getting the values sent by user
        const {username,mail,password}=req.body;

        //checking is user already exists
        const userExists = await User.exists({mail:mail.toLowerCase()});
        if(userExists){
            return res.status(409).send("Email already in use");
        }
        //encrypting password
        const encryptedPassword = await bcrypt.hash(password,10);

        //save user in the database
        const user = await User.create({
            username,
            mail:mail.toLowerCase(),
            password:encryptedPassword
        });

        //creating the JWT token
        const token = jwt.sign(
            {
            userId:user._id,
            mail,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:"24h"
            }
        );
        res.status(201).json({
            userDetails:{
                mail:user.mail,
                token:token,
                username:user.username,
                _id:user._id,
            }
        })


    }catch(err){
        console.log(err);
        return res.status(500).send("error occured");
    }
};

module.exports =postRegister;