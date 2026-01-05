import Card from './components/Card'
import Navbar2 from './components/Navbar2'

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-white">

      <Navbar2 />
      
      <div className="w-full flex justify-center pt-10 px-4">

    <Card />
    
      </div>
     
      
    </div>
  )
}

export default App
