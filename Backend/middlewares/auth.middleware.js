import jwt from "jsonwebtoken";

const verifyToken = (req,res, next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.json({stauts: "Error",message:"Access denied, please login"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.json({status:"Error",message:err.message})
    }

}

export {verifyToken}