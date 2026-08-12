import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import ProtectedRoute from '../components/ProtectedRoute';
import Wishlist from '../pages/Wishlist/Wishlist';
import SellProduct from '../pages/SellProduct/SellProduct';
const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path:'signup',
                element: <Signup/>
            },
            {
                element: <ProtectedRoute/>,
                children: [
                    {
                        path: 'wishlist',
                        element: <Wishlist/>
                    },
                    {
                        path: 'sell',
                        element: <SellProduct/>
                    }
                ]
            }
        ]
    }
]);

export default router;