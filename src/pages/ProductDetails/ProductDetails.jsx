import { arrayRemove, arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import './ProductDetails.css';

function ProductDetails(){

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const {user} = useAuth();
    const navigate = useNavigate();

    async function handleWishlist() {

        if(!user){
            navigate('/login');
            return ;
        }

        try {
            await setDoc(doc(db, 'users', user.uid),
                {
                    wishlist: isWishlisted
                    ? arrayRemove(product.id)
                    : arrayUnion(product.id)
                },
                { merge : true}
            );

            setIsWishlisted(!isWishlisted);

        } catch (error) {
            console.error(error.message);
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

    useEffect(() => {
        async function checkWishlist() {
            if (!user) return;
    
            const snapshot = await getDoc(doc(db, "users", user.uid));
            const wishlist = snapshot.data()?.wishlist || [];
    
            setIsWishlisted(wishlist.includes(id));
        }
    
        checkWishlist();
    }, [user, id]);
    

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
                            className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
                            onClick={handleWishlist}
                        >
                            {isWishlisted ? "♥" : "♡"}
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
                        className={`main-wishlist-btn ${isWishlisted ? "remove" : ""}`}
                        onClick={handleWishlist}
                    >
                        {isWishlisted
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                    </button>
    
                </div>
            </div>
        </div>
    )       
}

export default ProductDetails;