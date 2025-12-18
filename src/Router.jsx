
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import App from './App.jsx'
import Search from './pages/Search.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'


const Router = () => {
  return (
    <div>
      
      <BrowserRouter>
  
    <Routes>
      <Route path='/register' element={<SignUp />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<ProtectedRoute>
        <App />
      </ProtectedRoute>}/>
      <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>} />
    </Routes>

  </BrowserRouter>
    </div>
  )
}

export default Router
