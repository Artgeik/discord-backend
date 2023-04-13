const jwt = require("jsonwebtoken");
const verifyToken = (req,res,next)=>{
    let token = req.body.token || req.query.token || req.headers["authorization"];
    
    if(!token){
        return res.status(403).send("A token is required for authentication");
    }

    try{
        token = token.replace(/^Bearer\s+/,"");
        const decoded = jwt.verify(token,process.env.TOKEN_KEY)
        req.user = decoded;
    }catch(err){
        console.log(err);
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;