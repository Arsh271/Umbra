
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Router from './Router.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'


createRoot(document.getElementById('root')).render(

  <NotificationProvider>
    <Router />
  </NotificationProvider>

)
