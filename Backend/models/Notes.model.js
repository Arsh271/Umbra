import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },

  encryptedText: {
    iv: {
      type: [Number],
      required: true
    },
    data: {
      type: [Number],
      required: true
    }
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  encryptedKey:String,
  sharedWith:[{
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    permission:{
      type: String,
      enum: ["read", "write"],
      default: "read"
    },
    encryptedKey:String
  }]
});

export const Note = mongoose.model("Note", noteSchema);
