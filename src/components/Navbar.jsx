import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-black flex justify-between item-center text-white h-1/15 px-4'>
      <div>
        {/* <img className='h-14 ' src="umbraLogo.png" alt="Umbra" /> */}
        <h2 className="text-xl font-semibold">Umbra</h2>
      </div>

    <div className='flex items-center gap-4  '>
      
        <button
         className='text-lg cursor-pointer bg-transparent border-none outline-none '>
            Search
        </button>


        <button
         className='bg-transparent border-none outline-none'
         >
            <img 
            className='h-10 w-10 rounded-full cursor-pointer'
             src="https://tse2.mm.bing.net/th/id/OIP.ouCsDsxW8XNvvNNFtA-3IAHaFk?pid=Api&P=0&h=180"
             alt="Arsh" 
             />
        </button>

    </div>
    
    </div>
  )
}

export default Navbar
