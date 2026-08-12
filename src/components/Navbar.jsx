import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar(){

    const {user, logout, loading} = useAuth();
    return (
        <>
            <nav className="navbar">
            <Link to={'/'} className="logo">OLX</Link>

            <Link to={'/'}>Home</Link>

            
            {loading ? null : user ?
                <>
                    <Link to={'/wishlist'}>Wishlist</Link>
                    <button onClick={logout}>Logout</button>
                </>
            :
                <>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>Signup</Link>
                </>
            
            }

            <Link to={'/sell'} className="sell-btn">Sell</Link>
            </nav>
        </>
    );
}

export default Navbar;