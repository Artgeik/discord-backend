const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");

//post login actions
const postLogin=async(req,res)=>{
    try{
        const {mail,password}= req.body;
        const user = await User.findOne({mail:mail.toLowerCase()});
        if(user && (await bcrypt.compare(password,user.password))){
            //Login successful send new token 
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

            return res.status(200).json({
                userDetails:{
                    mail:user.mail,
                    token:token,
                    username:user.username,
                    _id:user._id
                }
            })
        }else{
            return res.status(400).send("invalid credentials. please try again");
        }
    }catch(err){
        console.log(err);
        return res.status(500).send("something went wrong");
    }
};

module.exports=postLogin;