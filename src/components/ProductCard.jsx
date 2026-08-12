import { Link } from "react-router-dom";

function ProductCard({ product }){

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <img src={product.imageUrl} alt={product.title} />

            <div className="product-info">
                <h2>{product.title}</h2>
                <p>₹{product.price}</p>
                <p>{product.location}</p>
                <p>{product.category}</p>
            </div>
            
        </Link>
    )
}

export default ProductCard;