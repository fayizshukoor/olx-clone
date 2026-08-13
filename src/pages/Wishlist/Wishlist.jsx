import { useEffect, useState } from "react";
import './Wishlist.css';
import useAuth from "../../hooks/useAuth";
import ProductCard from "../../components/ProductCard";
import { arrayRemove, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

function Wishlist() {

    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    async function handleRemove(productId) {
        try {
            await setDoc(
                doc(db, "users", user.uid),
                {
                    wishlist: arrayRemove(productId)
                },
                { merge: true }
            );

            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const userSnapshot = await getDoc(
                    doc(db, "users", user.uid)
                );

                const wishlistIds = userSnapshot.data()?.wishlist || [];

                const productSnapshots = await Promise.all(
                    wishlistIds.map((id) =>
                        getDoc(doc(db, "products", id))
                    )
                );

                const wishlistProducts = productSnapshots
                    .filter((snapshot) => snapshot.exists())
                    .map((snapshot) => ({
                        id: snapshot.id,
                        ...snapshot.data()
                    }));

                setProducts(wishlistProducts);
            } catch (error) {
                console.error(error);
            }
        }

        if (user) {
            fetchWishlist();
        }

    }, [user]);

    return (
        <div className="wishlist-page">
            <h1>My Wishlist</h1>

            <div className="products-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="wishlist-item">
                            <ProductCard product={product} />

                            <button
                                className="remove-btn"
                                onClick={() => handleRemove(product.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="empty-wishlist">
                        <h2>Your Wishlist is Empty</h2>
                        <p>
                            Products you add to your wishlist will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;