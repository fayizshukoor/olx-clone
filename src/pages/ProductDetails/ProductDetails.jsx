import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import './ProductDetails.css';
import useWishlist from "../../hooks/useWishlist";

function ProductDetails(){

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const {user} = useAuth();
    const {addToWishlist, removeFromWishlist, isWishlisted} = useWishlist();
    const navigate = useNavigate();

    async function handleWishlist() {
        if (!user) {
            navigate("/login");
            return;
        }
    
        try {
            if (isWishlisted(product.id)) {
                await removeFromWishlist(product.id);
            } else {
                await addToWishlist(product.id);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        async function fetchProduct() {
            try {
                const snapshot = await getDoc(doc(db, 'products',id));
                if(snapshot.exists()){
                    setProduct({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProduct();
    },[id]);
    

    if(!product){
        return <Loading/>
    }


    return (
        <div className="product-details-page">
            <div className="product-details">
    
                <div className="product-image-section">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                    />
                </div>
    
                <div className="product-info-section">
    
                    <div className="product-header">
                        <div>
                            <h1>{product.title}</h1>
                            <p className="product-location">
                                📍 {product.location}
                            </p>
                        </div>
    
                        <button
                            className={`wishlist-btn ${isWishlisted(product.id) ? "wishlisted" : ""}`}
                            onClick={handleWishlist}
                        >
                            {isWishlisted(product.id) ? "♥" : "♡"}
                        </button>
                    </div>
    
                    <h2 className="product-price">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                    </h2>
    
                    <div className="product-divider"></div>
    
                    <h3>Description</h3>
                    <p className="product-description">
                        {product.description}
                    </p>
    
                    <div className="product-meta">
                        <div>
                            <span>Category</span>
                            <strong>{product.category}</strong>
                        </div>
    
                        <div>
                            <span>Location</span>
                            <strong>{product.location}</strong>
                        </div>
                    </div>
    
                    <div className="seller-box">
                        <div className="seller-avatar">
                            {product.sellerEmail?.charAt(0).toUpperCase()}
                        </div>
    
                        <div>
                            <span>Seller</span>
                            <strong>{product.sellerEmail}</strong>
                        </div>
                    </div>
    
                    <button
                        className={`main-wishlist-btn ${isWishlisted(product.id) ? "remove" : ""}`}
                        onClick={handleWishlist}
                    >
                        {isWishlisted(product.id)
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                    </button>
    
                </div>
            </div>
        </div>
    )       
}

export default ProductDetails;