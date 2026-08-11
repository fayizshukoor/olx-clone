import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
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
            }
        ]
    }
]);

export default router;