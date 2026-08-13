import { useEffect, useState } from "react";
import './MyAds.css';
import '../Wishlist/Wishlist.css';
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { db } from "../../services/firebase";
import Loading from "../../components/Loading";

function MyAds() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        async function fetchMyAds() {
            try {
                const q = query(
                    collection(db, "products"),
                    where("sellerId", "==", user.uid)
                );

                const snapshot = await getDocs(q);

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchMyAds();
    }, [user]);

    async function handleDelete() {
        try {
            setDeleting(true);

            await deleteDoc(doc(db, "products", deleteId));

            setProducts((prev) =>
                prev.filter((product) => product.id !== deleteId)
            );

            setDeleteId(null);
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="wishlist-page">
            <h1>My Ads</h1>

            {products.length === 0 ? (
                <p>You haven't listed any products yet.</p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="wishlist-item">
                            <div>
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="my-ad-image"
                                />

                                <h2>{product.title}</h2>
                                <p>₹{product.price}</p>
                                <p>{product.location}</p>
                            </div>

                            <div className="my-ad-actions">
                                <button
                                    onClick={() =>
                                        navigate(`/edit-product/${product.id}`)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="remove-btn"
                                    onClick={() => setDeleteId(product.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deleteId && (
                <div className="modal-overlay">
                    <div className="delete-modal">
                        <h2>Delete this ad?</h2>
                        <p>This action cannot be undone.</p>

                        <div className="modal-actions">
                            <button
                                onClick={() => setDeleteId(null)}
                                disabled={deleting}
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyAds;