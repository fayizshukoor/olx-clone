import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import Loading from "../../components/Loading";
import "../SellProduct/SellProduct.css";
import { uploadImage } from "../../services/cloudinary";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

                    // Existing image
                    setImagePreview(data.imageUrl);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProduct();
    }, [id]);

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            let updatedImageUrl = product.imageUrl;

            if (image) {
                updatedImageUrl = await uploadImage(image);
            }

            await updateDoc(doc(db, "products", id), {
                title: title.trim(),
                price: Number(price),
                description: description.trim(),
                category: category.trim(),
                location: location.trim(),
                imageUrl: updatedImageUrl
            });

            navigate("/my-ads");
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (!product) {
        return <Loading />;
    }

    return (
        <div className="sell-form">
            <form onSubmit={handleSubmit}>
                <h1>Edit Product</h1>

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

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
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    placeholder="Description"
                />

                <input
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    placeholder="Category"
                />

                <input
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                    placeholder="Location"
                />

                <label>Product Image</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Product preview"
                        className="image-preview"
                    />
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
}

export default EditProduct;