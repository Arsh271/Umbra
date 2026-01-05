import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const Navbar2 = () => {
  const { showNotification } = useNotification();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    showNotification("Logout Successful", "success");
    navigate("/login");
  }
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-4 bg-gray-900 shadow-md flex items-center justify-between mb-10">
      <h1 className="text-xl font-semibold">Umbra </h1>
      <div className='flex items-center gap-4  '>

        {currentPath != '/home' && (<Link to='/home' className="px-4 py-2 rounded-lg text-lg font-medium  text-gray-300  hover:text-white  hover:bg-gray-800  transition-all  duration-200" >Home</Link>)}
        {currentPath != '/share' && (<Link to='/share' className="px-4 py-2 rounded-lg text-lg font-medium  text-gray-300  hover:text-white  hover:bg-gray-800  transition-all  duration-200" >Share</Link>)}
        {currentPath != '/shared' && (<Link to="/shared" className="px-4 py-2 rounded-lg text-lg font-medium  text-gray-300  hover:text-white  hover:bg-gray-800  transition-all  duration-200">Notes</Link>)}
        {currentPath != '/search' && (<Link to="/search" className="px-4 py-2 rounded-lg text-lg font-medium  text-gray-300  hover:text-white  hover:bg-gray-800  transition-all  duration-200">Search</Link>)}
        <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-lg font-medium  text-gray-300  hover:text-white  hover:bg-gray-800  transition-all  duration-200">Logout</button>

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

export default Navbar2
