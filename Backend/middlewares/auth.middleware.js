import jwt from "jsonwebtoken";

const verifyToken = (req,res, next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.json({stauts: "Error",message:"Access denied, please login"})
    }

    try{
        const decoded = jwt.verify(token,"secretkey");
        req.user = decoded;
        next();
    }catch(err){
        res.json({status:"Error",message:"invalid token "})
    }

}

export {verifyToken}