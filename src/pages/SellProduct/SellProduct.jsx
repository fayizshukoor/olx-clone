import { useState } from "react"
import useAuth from "../../hooks/useAuth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import './SellProduct.css';
import { uploadImage } from "../../services/cloudinary";

function SellProduct() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');



    const { user } = useAuth();

    const navigate = useNavigate();

    function validateForm() {
        if (!title.trim()) {
            return "Title is required";
        }

        if (title.trim().length < 3) {
            return "Title must be at least 3 characters";
        }

        if (!price || Number(price) <= 0) {
            return "Price must be greater than 0";
        }

        if (!description.trim()) {
            return "Description is required";
        }

        if (description.trim().length < 10) {
            return "Description must be at least 10 characters";
        }

        if (!category.trim()) {
            return "Category is required";
        }

        if (!location.trim()) {
            return "Location is required";
        }

        return null;
    }


    async function handleSubmit(e) {
        e.preventDefault();
    
        const validationError = validateForm();
    
        if (validationError) {
            setError(validationError);
            return;
        }
    
        if (!image) {
            setError("Product image is required");
            return;
        }
    
        try {
            setError("");
            setLoading(true);
    
            // Upload image to Cloudinary
            const imageUrl = await uploadImage(image);
    
            // Save product to Firestore
            await addDoc(collection(db, "products"), {
                title: title.trim(),
                price: Number(price),
                description: description.trim(),
                category: category.trim(),
                location: location.trim(),
                imageUrl: imageUrl,
                sellerId: user.uid,
                sellerEmail: user.email,
                createdAt: serverTimestamp()
            });
    
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="sell-form">
            <form onSubmit={handleSubmit}>

                {error && <p className="auth-error">{error}</p>}
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price} />
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} value={category} />
                <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} value={location} />
                
                <label htmlFor="product-image">Product Image</label>

                <input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];

                        if (file) {
                            setImage(file);
                            setImagePreview(URL.createObjectURL(file));
                        }
                    }}
                />

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                    />
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Posting..." : "Post Now"}
                </button>
            </form>
        </div>
    )
}

export default SellProduct;