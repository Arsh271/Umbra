import React, { useState } from 'react'
import Preview from './Preview'
import CipherText from './CipherText'

const Card = () => {

  const [text ,setText] = useState('')
  const [heading ,setHeading] = useState('')
  
  
  return (
    <div className='h-full w-full bg-[#0a0f1f]'>
    <div className='bg-gray-900 h-28/45 w-full text-white p-3'>

        <h1 className='border-4 border-t-8 border-r-8 border-slate-400 p-2 bg-slate-900 text-center'>Enter Note </h1>

        <input
         className='h-10 px-2 w-full bg-[#1a1f33] border-4 border-r-8 border-slate-400 outline-none' 
         placeholder='Enter title' 
         type="text" 
         value={heading} 
         onChange={(e)=>{
          setHeading(e.target.value)
        }} 
        />

        <textarea 
        className='bg-[#1a1f33] h-2/3 w-full border-4 border-r-8 border-slate-400 outline-none' 
        placeholder='Enter text' 
        name="" 
        id="" 
        value={text} 
        onChange={(e)=>{
          setText(e.target.value)
        }}
        >
        </textarea>


        <div className='flex justify-end'>

        <button 
        className='bg-indigo-500 px-3 py-1 rounded active:scale-95'
        >
        Add Note
        </button>

        </div>
        
    
    </div>
     <div className='h-full w-full flex justify-between '>

        <Preview text={text} heading={heading} />
        <CipherText />

      </div>
    </div>
  )
}

export default Card
