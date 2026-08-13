import { useEffect, useState } from "react";
import "./Wishlist.css";
import ProductCard from "../../components/ProductCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import useWishlist from "../../hooks/useWishlist";

function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchWishlistProducts() {
            try {
                const productSnapshots = await Promise.all(
                    wishlist.map((id) =>
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

        fetchWishlistProducts();
    }, [wishlist]);

    async function handleRemove(productId) {
        try {
            await removeFromWishlist(productId);

            setProducts((prev) =>
                prev.filter((product) => product.id !== productId)
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="wishlist-page">
            <h1>My Wishlist</h1>

            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="wishlist-item"
                        >
                            <ProductCard product={product} />

                            <button
                                className="remove-btn"
                                onClick={() =>
                                    handleRemove(product.id)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="empty-wishlist">
                        <h2>Your Wishlist is Empty</h2>
                        <p>
                            Products you add to your wishlist will
                            appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;