import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

function PublicRoute(){

    const {loading, user} = useAuth();

    if(loading){
        return <Loading/>
    }

    if(user){
        return <Navigate to={'/'} />
    }

    return <Outlet />
}

export default PublicRoute;