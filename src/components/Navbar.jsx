import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useWishlist from "../hooks/useWishlist";

function Navbar() {

    const { user, logout, loading } = useAuth();
    const { wishlist } = useWishlist();

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                OLX
            </Link>

            <Link to="/">
                Home
            </Link>

            {loading ? null : user ? (
                <>
                    <Link to="/my-ads">
                        My Ads
                    </Link>

                    <Link to="/wishlist">
                        Wishlist ({wishlist.length})
                    </Link>

                    <button onClick={logout}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/signup">
                        Signup
                    </Link>
                </>
            )}

            <Link to="/sell" className="sell-btn">
                Sell
            </Link>

        </nav>
    );
}

export default Navbar;