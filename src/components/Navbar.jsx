import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
   <div className="w-full px-6 py-4 bg-gray-900 shadow-md flex items-center justify-between mb-10">
        <h1 className="text-xl font-semibold text-white">Umbra </h1>
        <div className='flex items-center gap-4  '>
      
        <Link to='/search'   className="px-4 py-2 rounded-lg text-lg font-medium  text-gray-300  hover:text-white  hover:bg-gray-800  transition-all  duration-200" >Search</Link>


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
