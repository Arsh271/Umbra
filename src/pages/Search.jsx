import React, { useState } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { encryptText, decryptText } from "../utils/crypto";

const Search = () => {

    const [heading , setHeading] =useState('')
    const [text ,setText] = useState('')
    const [search ,setSearch]= useState('')
    const [action , setAction]= useState('')
    const createdBy =localStorage.getItem("username")
    const [password, setPassword] = useState('');


    const handleSubmit =async(e)=>{
        e.preventDefault();
        console.log(e.target);

        if (!createdBy) {
      alert("User not logged in");
      return;
      }

        if(action==="update"){
          if(!password){
            alert("Encryption password is required")
            return;
          }
          try{
            const encryptedText = await encryptText(text,password);
            const res = await axios.post('http://localhost:3001/update',{search,heading,encryptedText,action,createdBy});
             alert(res.data)
          }
          catch(err){
            console.error(err);
            alert("Update failed");
            
          }
        }
        
        else if(action==="delete"){
          const res = await axios.post("http://localhost:3001/update",{search,action,createdBy});
          alert(res.data);
        }
        
    }


    const handleSearch=async (e)=>{
        e.preventDefault();

        if(!password){
          alert("Encryption password is required");
          return ;
        }
        try{
          const res = await axios.post('http://localhost:3001/search',{search,createdBy})
        ;
        
        
            if(res.data==="No such note exist"){
                alert(res.data)
            }
            else{
                 
            
            const encryptedText=  res.data.existingHeading.encryptedText
            const decryptedText = await decryptText(encryptedText,password)
            setText(decryptedText)
            setHeading(res.data.existingHeading.heading)
            } }      
        
        catch(err){
          console.error(err);
          alert("Wrong password or corrupted data")
        }
    }

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white">

      
     <Navbar2 />

     
      <div className="max-w-3xl mx-auto px-4">

      
        <form onSubmit={handleSearch} className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search notes..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                       focus:outline-none focus:border-blue-500"
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
          />

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
            name="action"
            value="search"
          >
            Search
          </button>
        </form>

        <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-800 mt-6">
  <label className="block mb-2 font-medium">
    🔐 Encryption Password
  </label>

  <input
    type="password"
    className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md 
               focus:outline-none focus:border-blue-500"
    placeholder="Enter encryption password to read note"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <p className="text-xs text-gray-400 mt-1">
    Used to decrypt the note locally
  </p>
</div>


     
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10 gap-6">

          <div className="w-full bg-gray-900 p-5 rounded-xl border border-gray-800">
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md 
                         focus:outline-none focus:border-blue-500"
              placeholder="Enter title"
              value={heading}
              onChange={(e)=>{setHeading(e.target.value)}}
            />
          </div>

          <div className="w-full bg-gray-900 p-5 rounded-xl border border-gray-800">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              rows="5"
              className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md 
                         resize-none focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
              value={text}
              onChange={(e)=>{setText(e.target.value)}}
            ></textarea>
          </div>

       
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
              name="action"
              value="update"
              onClick={()=>{setAction("update")}}
            >
              Update
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
              name="action"
              value="delete"
              onClick={()=>{setAction("delete")}}
            >
              Delete
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Search;
