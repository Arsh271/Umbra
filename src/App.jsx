import React from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Preview from './components/Preview'
import CipherText from './components/CipherText'

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-white">

      <Navbar />
      
      <div className='h-full w-full overflow-hidden'>

    <Card />
    
      </div>
     
      
    </div>
  )
}

export default App
