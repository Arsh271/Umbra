
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import App from './App.jsx'
import Search from './pages/Search.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import OTPVerify from './pages/OTPVerify.jsx'
import Share from './pages/Share.jsx'
import SharedNotes from './pages/SharedNotes.jsx'
import SharedNoteDetail from './pages/SharedNoteDetail.jsx'


const Router = () => {
  return (
    <div>
      
      <BrowserRouter>
  
    <Routes>
      <Route path='/register' element={<SignUp />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/' element={<Login />}/>
      <Route path='/verify' element={<OTPVerify />} />
      <Route path='/home' element={<ProtectedRoute>
        <App />
      </ProtectedRoute>}/>
      <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path='/share' element={<ProtectedRoute> <Share /> </ProtectedRoute>} />
      <Route path='/shared' element={<ProtectedRoute> <SharedNotes /> </ProtectedRoute>} />
      <Route path="/shared/:id" element={<ProtectedRoute> <SharedNoteDetail /> </ProtectedRoute>} />
    </Routes>

  </BrowserRouter>
    </div>
  )
}

export default Router
