import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import ProductCard from "../../components/ProductCard";
import './Home.css';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const snapshot = await getDocs(collection(db, "products"));

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="home-page">

            <section className="hero-section">
                <div className="hero-content">
                    <h1>Find what you're looking for</h1>
                    <p>
                        Buy and sell anything around you.
                    </p>

                    <div className="search-box">
                        <span>🔍</span>
                        <input
                            type="text"
                            placeholder="Search for products..."
                        />
                    </div>
                </div>
            </section>

            <section className="recommendations">
                <div className="section-header">
                    <h2>Fresh recommendations</h2>
                    <span>{products.length} listings</span>
                </div>

                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Home;