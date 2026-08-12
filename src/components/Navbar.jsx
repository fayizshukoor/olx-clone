import { Link } from "react-router-dom";

function Navbar(){
    return (
        <>
            <nav className="navbar">
            <Link to={'/'} className="logo">OLX</Link>

            <Link to={'/'}>Home</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'/signup'}>Signup</Link>

            <Link to={'/sell'} className="sell-btn">Sell</Link>
            </nav>
        </>
    );
}

export default Navbar;