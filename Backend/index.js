import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verifyToken } from './middlewares/auth.middleware.js'

import { User } from "./models/User.models.js"

import { Note } from "./models/Notes.model.js"
import { sendEmail} from "./utils/sendEmail.js"
import dotenv from "dotenv";

dotenv.config();



const app = express()

app.use(express.json())

app.use(cors())

mongoose.connect(process.env.MONGO_URI);

app.post('/login', async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email: email})
   

       
        if(user && user.isVerified===true){
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch){

                 const token = jwt.sign(
                    {id: user._id},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRES_IN }
                );

                res.json({status:"Success",token, username:user.name,message:"Successfully logged in"})

               

            }
            else{
                res.json({status: "Error",message: "Incorrect Password"})
            }
        }
        else{
            res.json({status: "Error", message: "No record existed"})
        }
   
})

app.post('/register',async (req,res)=>{

    const {name, email ,password} = req.body;
    
    

    if(name===""||email===""||password===""){
       return res.json({status:"Error",message:"All fields are  required"});
    }
    const user = await User.findOne({email: email})

     if(user&&user.isVerified==="true"){
        return res.json({status:"Error",message:"User already existed"})
    }

    const hashedPassword =  await bcrypt.hash(password,10);
    const otp = Math.floor(100000 + Math.random()*900000).toString();
    
    const hashedOtp= await bcrypt.hash(otp,10);
        
    if(user){
        user.name=name;
        user.password=hashedPassword;
        user.otp=hashedOtp;
        otpExpires=Date.now + process.env.OTP_EXPIRY_MINUTES*60*1000;
        await user.save();

    }else{
        await User.create({
            name,
            email,
            password: hashedPassword,
            otp: hashedOtp,
            otpExpires: Date.now() +process.env.OTP_EXPIRY_MINUTES*60*1000
        })}
       
    
    try {
        await sendEmail(email,otp)
        res.json({status:"Success",message:"Otp sent to your Email , please verify it !!"})
        
    } catch (err) {
        return res.json({status:"Error",message:`Email not sent, ${err}`})
    }
        

   
   
    
   


})


app.post('/verify', async (req,res)=>{
    const {email, otp}=  req.body;

    if(email==""||otp==""){
        return res.json({status:"Error",message:"Either Email is missing or otp field is not filled"})
    }
    const user= await User.findOne({email: email})

    if(!user){
        return res.json({ status:"Error", message:"User not registered"})
    }
    if(user.otpExpires< Date.now()){
        await User.deleteOne({email: email})
        return res.json({status:"Error", message:"OTP expired"})
    }
    const isOtpMatch = await bcrypt.compare(otp,user.otp)
    console.log(isOtpMatch);
    
    if(!isOtpMatch){
       
        return res.json({status:"Error",message:"Invalid OTP"})
    }

    user.isVerified= true;
    user.otp= null;
    user.otpExpires=null;
    await user.save()

    res.json({status:"Success", message:"Email verified, now you can login !!"})
})




app.post('/home',verifyToken, async (req,res)=>{

    const {heading , encryptedText,encryptedKey} = req.body;
    const createdBy= req.user.id


    if(!heading || heading.trim()===""){
     return   res.json({status:"Error",message:"Title is required"});
    }
    if(!encryptedText || !encryptedKey){
        return res.json({status: "Error",message:"Encrypted content missing"})
    }


    const existingHeading = await Note.findOne({heading: heading, createdBy: createdBy})
    
    if(existingHeading){
      return  res.json({status:"Error",message:"Title already exist..."})
    }
     
    
    try {
        const note= await Note.create({
            heading: heading.trim(),
            encryptedText,
            createdBy,
            encryptedKey:encryptedKey,
            sharedWith:[
                {
                    user: createdBy,
                    permission:"write",
                    encryptedKey
                }
            ]
        })

        res.json({status:"Success",note})
        
    } catch (error) {

        res.json({status:"Error",message:"Database error",error})
        
    }
       

    
    
    
})

app.post('/search',verifyToken,async (req,res)=>{
    try {
        const {search} =req.body;
        const createdBy= req.user.id
        if (!search || search.trim() === "") {
      return res.json({ status: "Error", message: "Search term missing" });
    }
        const existingHeading = await Note.findOne({heading: search.trim(), createdBy: createdBy})
    
        if(!existingHeading){
          return   res.json({status:"Error",message:"No such note exist"})
        }
        
            res.json({status:"Success",note:existingHeading})
    } catch (err) {
        console.log("server error")
         res.json({ status: "Error", message: err.message });
    }
    
})


app.post('/update',verifyToken,async (req,res)=>{
   try {
     const {search,heading,encryptedText,action}= req.body;
     const userId = req.user.id;
     const note = await Note.findOne({heading: search , createdBy: userId  })
 
     if(action==="update"){
         if(note){
         await Note.updateOne(
             {heading: search},
             {$set: {
                 encryptedText: encryptedText,
                 heading: heading
             }}
         )
         res.json({status:"Success",message:"Note Updated"})
     }
     else{
         res.json({status:"Error",message:"Note not found !!!"})
     }}
     else if(action==="delete"){
         await Note.deleteOne({heading: search})
         res.json({status:"Success",message:"Note deleted"})
     }
   } catch (err) {
    res.json({status:"Error",message:err.message})
   }


});

app.post('/my-notes', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const notes = await Note.find({ createdBy: userId }).select("_id heading");

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

app.post('/save-public-key',verifyToken,async (req,res)=>{

    try{
        const {publicKey}= req.body;
        const userId= req.user.id

        if(!publicKey){
            return res.json({status:"Error",message:"Public key is missing"})
        }

        await User.updateOne(
            {_id: userId},
            {$set: {publicKey}}
        );
        res.json({status:"Success", message: "Public key saved"})
    }catch(err){
        console.log(err);
        res.json({status:"Error",message:"Failed to save public key"});
    }

})

app.post('/share-note',verifyToken, async (req,res)=>{

    try {

        const {noteId, receiverEmail, permission,encryptedKey}= req.body;
        const senderId= req.user.id;

        if (!noteId || !receiverEmail|| !encryptedKey || !permission) {
        return res.json({ status: "Error", message: "Missing data" });
        }

         const note = await Note.findOne({ _id: noteId, createdBy: senderId });
        if (!note) {
            return res.json({ status: "Error", message: "Note not found or not yours" });
        }

        const receiver = await User.findOne({ email: receiverEmail });
        if (!receiver) {
            return res.json({ status: "Error", message: "Receiver not found" });
        }

        const alreadyShared = note.sharedWith.find(
      (entry) => entry.user.toString() === receiver._id.toString()
        );
        if (alreadyShared && alreadyShared.permission==permission) {
            return res.json({ status: "Error", message: "Already shared with this user" });
        }
        

         note.sharedWith.push({
         user: receiver._id,
         permission: permission || "read",
         encryptedKey: req.body.encryptedKey
        });

        
        await note.save();

    res.json({ status: "Success", message: "Note shared successfully" });

    } catch (error) {
        console.error(error);
    res.json({ status: "Error", message: error.message });
    
    }

})

app.post("/get-public-key", verifyToken, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ status: "Error", message: "User not found" });
  res.json({status:"Success", publicKey: user.publicKey });
});

app.post("/get-note-key", verifyToken, async (req, res) => {
  const { noteId } = req.body;
  const userId = req.user.id;

  const note = await Note.findById(noteId);
  const entry = note.sharedWith.find(e => e.user.toString() === userId);

  if (!entry) {
    return res.json({ status: "Error", message: "Access denied" });
  }

  res.json({ status: "Success", encryptedKey: entry.encryptedKey });
});

app.post("/owner-public-key",verifyToken, async (req,res)=>{
    try {
        const userId= req.user.id
        const user = await User.findOne({_id:userId})
        if(!user){ return  res.json({status:"Error",message:"User not found"})   }

        if (!user.publicKey) {
            return res.json({ status: "Error", message: "Public key not set" });
        }

        res.json({status:"Success",publicKey:user.publicKey})
    } catch (error) {
        console.log(error)
    }
})

app.post("/shared-notes",verifyToken, async(req,res)=>{
    try {
        const userId= req.user.id;

        const notes= await Note.find({"sharedWith.user":userId})
            .populate("createdBy","name email");

            const result = notes.map((note) =>{
                const entry = note.sharedWith.find((e) => {
                return e.user.toString() === userId.toString();
            });

                return {
                    _id: note._id,
                    heading: note.heading,
                    encryptedText:note.encryptedText,
                    permission: entry.permission,
                    encryptedKey: entry.encryptedKey,
                    owner:{
                        id: note.createdBy._id,
                        name: note.createdBy.name,
                        email: note.createdBy.email
                    }
                }
            })

            res.json({status:"Success",notes: result})
    } catch (err) {
        console.log(err)
        res.json({status:"Error",message:"Failed to fetch shared notes"
        })
    }
})

app.post('/note-key', verifyToken, async (req, res) => {
  try {
    const { search } = req.body;
    const createdBy = req.user.id;

    const note = await Note.findOne({ heading: search, createdBy });

    if (!note) return res.json({ status: "Error", message: "Note not found" });

    res.json({ status: "Success", encryptedKey: note.encryptedKey });

  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
});

app.post("/shared-note/:id",verifyToken, async (req,res)=>{
    try {
        const userId= req.user.id;
        const note= await Note.findOne({
            _id:req.params.id,
            "sharedWith.user":userId
        })

        if(!note){
            return res.json({status:"Error",message:"Access denied"})
        }

        const entry= note.sharedWith.find(e=> e.user.toString()===userId);

        res.json({
            _id:note._id,
            heading: note.heading,
            encryptedText: note.encryptedText,
            encryptedKey: entry.encryptedKey,
            permission: entry.permission,
            createdBy: note.createdBy
        })
    } catch (err) {
        req.json({status:"Error",message:"Failed"})
    }
})

app.post("/shared-note/:id/delete", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const note = await Note.findById(noteId);

    if (!note) {
      return res.json({ status: "Error", message: "Note not found" });
    }

    if (note.createdBy.toString() === userId) {
      await Note.deleteOne({ _id: noteId });
      return res.json({ status: "Success", message: "Note deleted for everyone" });
    }

    const sharedIndex = note.sharedWith.findIndex(
      (entry) => entry.user.toString() === userId
    );

    if (sharedIndex === -1) {
      return res.json({ status: "Error", message: "You do not have access to this note" });
    }

    note.sharedWith.splice(sharedIndex, 1);
    await note.save();

    return res.json({ status: "Success", message: "Note removed from your shared list" });

  } catch (err) {
    res.json({ status: "Error", message: err.message });
  }
});


app.post("/shared-note/:id/update", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { heading, encryptedText } = req.body;

    const note = await Note.findOne({
      _id: req.params.id,
      "sharedWith.user": userId,
      "sharedWith.permission": "write"
    });

    if (!note) return res.json({ status:"Error",message: "No write access" });

    note.heading = heading;
    note.encryptedText = encryptedText 
    await note.save();

    res.json({ status:"Success",message: "Note updated" });
  } catch (err) {
    res.json({ status:"Error",message: err.message });
  }
});



app.listen(3001, ()=>{
    console.log("server is running");
    
})