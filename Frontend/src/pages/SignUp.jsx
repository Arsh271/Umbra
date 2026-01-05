import React, {  useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {



    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const navigate= useNavigate()


    const handleSubmit =(e)=>{
      e.preventDefault()
      axios.post('http://localhost:3001/register',{name,email,password})
      .then((res)=>{
        
        if(res.data.status==="Error"){
          alert(res.data.message)
        }
        else if(res.data.status==="Success"){
          console.log(res.data.message);
          alert(res.data.message)
          navigate('/verify')
        }
        
        

      })
      .catch((err)=>{
        console.log(err);
        
      })
      
    }


    

  return (
    <div className='h-screen w-full bg-gray-950 flex items-center justify-center text-shadow-slate-50 '>
      

        <div className='bg-gray-800 w-100 h-112 rounded-xl shadow-xl hover:shadow-[0_0_25px_rgba(56,140,248,1)] text-white px-4 flex flex-col gap-6'>

            <div className='flex justify-center items-center py-1'>
                <h1 className='text-white font-bold text-3xl py-1'>Welcome</h1>
            </div>


            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
              <div className='flex gap-6 w-full'>
              <label htmlFor="Fname" className='text-lg w-1/3'>
                Full Name:
              </label>

              <input
               type="text"  
               placeholder='Enter Your Name' 
               id='Fname'
               className="w-2/3 border-b-3 border-white  px-2 py-2 rounded-md 
               focus:border-blue-500 focus:outline-none
               transition-all duration-300
               placeholder-gray-400"
               value={name}
               onChange={(e)=>{
                setName(e.target.value)
               }}
               />

            </div>


            <div className='flex gap-6 w-full'>
              <label htmlFor="email" className='text-lg w-1/3'>
                Email:
              </label>

              <input 
              type="email" 
              id='email' 
              name='email'  
              placeholder='Enter Your Email' 
              className="w-2/3 border-b-3 border-white  px-2 py-2 rounded-md 
               focus:border-blue-500 focus:outline-none
               transition-all duration-300
               placeholder-gray-400"
               value={email}
               onChange={(e)=>{
                setEmail(e.target.value)
               }}
               />
            </div>


            <div className='flex gap-6 w-full'>
              <label htmlFor="Password" className='text-lg w-1/3'>
                Password:
              </label>

              <input 
              type="Password" 
              id='Password' 
              name='Password'  
              placeholder='Enter Your Password' 
              className="w-2/3 border-b-3 border-white  px-2 py-2 rounded-md 
               focus:border-blue-500 focus:outline-none
               transition-all duration-300
               placeholder-gray-400"
               value={password}
               onChange={(e)=>{
                setPassword(e.target.value)
               }}
               />
            </div>

            <div className='w-full flex justify-center'>
              <button
                type="submit"
                className="w-4/5 bg-blue-500 text-white font-semibold py-2 rounded-lg 
                hover:bg-blue-600 active:scale-95 transition-all duration-300
                focus:ring-2 focus:ring-blue-300 focus:outline-none
                shadow-md hover:shadow-lg"
              >
              Sign up
              </button>
            </div>
            </form>

            

            <p className='text-center text-gray-400 text-sm mt-6'>
              Alread Registered?  <Link to='/login' className='text-cyan-400 hover:underline'>sign in</Link>
            </p>

        </div>

    </div>
  )
}

export default SignUp
