import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute(){
    const { user, loading } = useAuth();

    if(loading){
        return <h1>Loading...</h1>
    }
    if(user){
        return <Outlet/>
    }
    
    return <Navigate to={'/login'}/>
    
}

export default ProtectedRoute;