import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import ProtectedRoute from '../components/ProtectedRoute';
import Wishlist from '../pages/Wishlist/Wishlist';
import SellProduct from '../pages/SellProduct/SellProduct';
import PublicRoute from '../components/PublicRoute';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
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
                element: <PublicRoute/>,
                children: [
                    {
                        path:'login',
                        element: <Login/>
                    },
                    {
                        path:'signup',
                        element: <Signup/>
                    }
                ]
            },
            {
                path: '/product/:id',
                element: <ProductDetails/>
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