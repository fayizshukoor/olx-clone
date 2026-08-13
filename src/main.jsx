import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <WishlistProvider>
        <RouterProvider router={router}/>
    </WishlistProvider>
</AuthProvider>
    
  </StrictMode>,
)
