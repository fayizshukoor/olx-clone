import { arrayRemove, arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

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
        <div className="product-details">
            <img src={product.imageUrl} alt={product.title} />
            <h1>{product.title}</h1>
            <h2>₹{product.price}</h2>
            <p>{product.description}</p>
            <p>{product.category}</p>
            <p>{product.location}</p>
            <p>Seller: {product.sellerEmail}</p>
            <button onClick={handleWishlist}>{isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}</button>
        </div>
    )
}

export default ProductDetails;