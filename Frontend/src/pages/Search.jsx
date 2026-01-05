import React, { useState } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { decryptWithPrivateKey, encryptWithPublicKey } from "../utils/cryptoKeys";
import { encryptText, decryptText } from "../utils/crypto";

const Search = () => {

    const [heading , setHeading] =useState('')
    const [text ,setText] = useState('')
    const [search ,setSearch]= useState('')
    const [action , setAction]= useState('')
    const createdBy =localStorage.getItem("username")
    const token = localStorage.getItem("token")
    const [password, setPassword] = useState('');


    const handleSubmit =async(e)=>{
        e.preventDefault();
        console.log(e.target);

        if (!token) {
      alert("User not logged in");
      return;
      }

        if(action==="update"){
          try{
            const keyRes = await axios.post('http://localhost:3001/note-key',{ search },
            { headers: { Authorization: `Bearer ${token}` } }
              );
              if (keyRes.data.status === "Error") {
                return alert(keyRes.data.message);
              }
              const encryptedKey = keyRes.data.encryptedKey;
              const privateKey= localStorage.getItem("privateKey")
              const noteKey = await decryptWithPrivateKey(privateKey, encryptedKey);
            const encryptedText = await encryptText(text,noteKey);
            const res = await axios.post('http://localhost:3001/update',{search,heading,encryptedText,action},{
              headers:{
                Authorization: `Bearer ${token}`
              }
            });
            setHeading('')
            setText('')
            setSearch('')
             alert(res.data.message)
          }
          catch(err){
            console.error(err);
            alert("Update failed");
            
          }
        }
        
        else if(action==="delete"){
          const res = await axios.post("http://localhost:3001/update",{search,action},{
            headers:{
              Authorization: `Bearer ${token}`
            }
          });
          setHeading('')
          setText('')
          setSearch('')
          alert(res.data.message);
        }
        
    }


    const handleSearch=async (e)=>{
        e.preventDefault();

        try{
          const res = await axios.post('http://localhost:3001/search',{search},{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
        ;
        
        
            if(res.data.status==="Error"){
              return  alert(res.data.message)
            }
               console.log(res.data.note);
               
               const privateKey=localStorage.getItem("privateKey")
               
            const encryptedText=  res.data.note.encryptedText
            const encryptedKey= res.data.note.encryptedKey
            const noteKey = await decryptWithPrivateKey(privateKey,encryptedKey)
            const decryptedText = await decryptText(encryptedText,noteKey)
            setText(decryptedText)
            setHeading(res.data.note.heading)
             }      
        
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
