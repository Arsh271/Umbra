import React from 'react'
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className=' h-screen w-full bg-gray-950 flex items-center justify-center text-shadow-slate-50'>

        <div className='bg-gray-800 w-100 h-112 rounded-xl shadow-xl hover:shadow-[0_0_25px_rgba(56,140,248,1)]'>
          
          <form >
           



        <div className="px-4 py-4 flex flex-col gap-3">
  <label
    htmlFor="email"
    className="block font-medium mb-1 text-white text-lg"
  >
    Email Address:
  </label>

  <input
    type="email"
    required
    name="email"
    id="email"
    placeholder="Enter Your Email"
    className="w-full border-b-3 border-white  px-2 py-2 rounded-md text-white
               focus:border-blue-500 focus:outline-none
               transition-all duration-300
               placeholder-gray-400"
  />
</div>



<div className="relative px-4 py-4 flex flex-col gap-3">
  <label
    htmlFor="password"
    className="block font-medium mb-1 text-white text-lg"
  >
    Password:
  </label>

  <input
    type="password"
    required
    name="password"
    id="password"
    placeholder="Enter Your Password"
    className="w-full border-b-3 border-gray-300 px-2 py-2 rounded-md text-white
               focus:border-blue-500 focus:outline-none
               transition-all duration-300
               placeholder-gray-400"
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
            Login
          </button>
        </div>
          
      
          </form>

           <div className='mt-8 flex items-center justify-between'>
                <span className='border-b w-1/4 border-gray-600 '></span>
                <span className='text-gray-400 text-sm'>OR</span>
                <span className='border-b  w-1/4 border-gray-600'></span>
            </div>

            <div className='w-full flex  justify-center'>
                <button className='mt-6 w-4/5  flex items-center justify-center bg-gray-700 border border-gray-600 py-2 
                rounded-lg shadow-md hover:bg-gray-600 hover:shadow-lg transition-all duration-300 focus:ring focus:ring-cyan-300 focus:outline-none'>
                <FcGoogle className='h-6 w-6 mr-3' />
                Continue With Google
            </button>
            </div>
            

            <p className='text-center text-gray-400 text-sm mt-6'>
              Don't have an account? <a href="#" className='text-cyan-400 hover:underline'>sign up</a>
            </p>

        </div>
      
    </div>
  )
}

export default Login
