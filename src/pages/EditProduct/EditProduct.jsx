import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import Loading from "../../components/Loading";
import '../SellProduct/SellProduct.css';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                const snapshot = await getDoc(doc(db, "products", id));

                if (snapshot.exists()) {
                    const data = snapshot.data();

                    setProduct(data);
                    setTitle(data.title);
                    setPrice(data.price);
                    setDescription(data.description);
                    setCategory(data.category);
                    setLocation(data.location);
                    setImageUrl(data.imageUrl);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProduct();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await updateDoc(doc(db, "products", id), {
                title,
                price: Number(price),
                description,
                category,
                location,
                imageUrl
            });

            navigate("/my-ads");
        } catch (error) {
            console.error(error);
        }
    }

    if (!product) {
        return <Loading />;
    }

    return (
        <form className="sell-form" onSubmit={handleSubmit}>
            <h1>Edit Product</h1>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />

            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />

            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
            />

            <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
            />

            <button type="submit">Update Product</button>
        </form>
    );
}

export default EditProduct;