import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import ProductCard from "../../components/ProductCard";

function Home(){

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        async function fetchProducts() {
            try {
                const snapshot = await getDocs(collection(db, 'products'));
                const data = snapshot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }));

                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    },[])
    return (
        <>
            <div className="products-grid">
                {products.map((product)=> {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </div>
        </>
    )
}

export default Home;