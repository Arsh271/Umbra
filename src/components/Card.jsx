import React, { useState } from 'react'
import Preview from './Preview'
import CipherText from './CipherText'
import axios from 'axios'
import { encryptText } from '../utils/crypto'
const Card = () => {

  const createdBy =localStorage.getItem("username")
  const [text ,setText] = useState('')
  const [heading ,setHeading] = useState('')
  const [password, setPassword] = useState('');


  const handleSubmit= async (e)=>{
    e.preventDefault();

    if (!createdBy) {
    alert("User not logged in");
    return;
    }

    if(!password){
      alert("Encryption password is required");
      return;
    }

    try{
      const encryptedText = await encryptText(text,password);

      const res =await axios.post('http://localhost:3001/home',{heading,encryptedText,createdBy});
      
      console.log(res.data);
      if(res.data==="Title already exist..."){
        console.log(res.data);
        alert(res.data)
      }
      else if(res.data==="Title is required"){
        console.log(res.data);
        alert(res.data)
      }
      setHeading("")
      setText("")
      setPassword("")
      
    
    }catch(error){
      console.log(error);
      alert("Encryption or saving failed")
    }
    
  }
  
  
  return (
    <div className="min-h-screen w-full bg-gray-950 text-white p-3">
    <div className='bg-gray-900  w-full text-white p-3'>

        <h1 className=' border-slate-400 p-2 bg-slate-900 text-center'>Enter Note </h1>

        <form className='flex flex-col items-center mt-1 gap-6 justify-center gap-2' onSubmit={handleSubmit}>

          <div className='w-full bg-gray-900 p-5 rounded-xl border border-gray-800'>
            <label className='block mb-2 font-medium'>Title</label>
            <input
         className='h-10 px-2 w-full bg-[#1a1f33] border-4 border-r-8 border-slate-400 outline-none' 
         placeholder='Enter title' 
         type="text" 
         value={heading} 
         onChange={(e)=>{
          setHeading(e.target.value)
        }} 
        />
          </div>

          <div className='w-full bg-gray-900 p-5 rounded-xl border border-gray-800'>
             <label className='block mb-2 font-medium'>DESCRIPTION</label>
        <textarea 
        className='bg-[#1a1f33]  w-full border-4 border-r-8 border-slate-400 outline-none' 
        placeholder='Enter text' 
        name="" 
        id="" 
        value={text} 
        onChange={(e)=>{
          setText(e.target.value)
        }}
        >
        </textarea>
            </div> 
       
        <div className='w-full bg-gray-900 p-5 rounded-xl border border-gray-800'>
  <label className='block mb-2 font-medium'>
    🔐 Encryption Password
  </label>

  <input
    type="password"
    className='h-10 px-2 w-full bg-[#1a1f33] border-4 border-r-8 border-slate-400 outline-none'
    placeholder='Enter encryption password'
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <p className="text-xs text-gray-400 mt-1">
    ⚠️ If you forget this password, the note cannot be recovered
  </p>
</div>


        <div >

        <button 
        className='bg-indigo-500 px-3 py-1 rounded active:scale-95'
        >
        Add Note
        </button>

        </div>
        </form>
        
        
    
    </div>
     <div className='h-full w-full bg-gray-900 flex justify-between gap-2 p-1 '>

        <Preview text={text} heading={heading} />
        {/* <CipherText /> */}

      </div>
    </div>
  )
}

export default Card
