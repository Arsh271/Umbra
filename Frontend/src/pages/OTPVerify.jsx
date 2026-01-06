import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const OTPVerify = () => {

    const [email, setEmail]= useState('')
    const [otp, setOTP] = useState('')
    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/verify',{email,otp})
        .then((res)=>{
            if(res.data.status==="Error"){
                alert(res.data.message)
                navigate('/register')
            }else{
                alert(res.data.message)
                navigate('/login')
                
            }

        }

        )
    }


return (
  <div className="min-h-screen w-full bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">

    <div className="bg-gray-900/70 backdrop-blur-xl w-[420px] rounded-2xl shadow-xl border border-gray-800 p-8 flex flex-col gap-8">

      <h2 className="text-center text-2xl font-semibold tracking-wide text-white">
        Verify Your Email
      </h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:outline-none
                       transition placeholder-gray-400 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:outline-none
                       transition placeholder-gray-400 text-white tracking-widest text-center"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-linear-to-r from-blue-500 to-indigo-500 
                     text-white font-semibold py-2 rounded-lg
                     hover:from-blue-600 hover:to-indigo-600
                     active:scale-95 transition
                     focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md"
        >
          Verify OTP
        </button>

      </form>

    </div>

  </div>
);

}

export default OTPVerify
