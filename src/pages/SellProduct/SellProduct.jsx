import { useState } from "react"
import useAuth from "../../hooks/useAuth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

function SellProduct(){

     const [title, setTitle] = useState('');
     const [price, setPrice] = useState('');
     const [description, setDescription] = useState('');
     const [category, setCategory] = useState('');
     const [location, setLocation] = useState('');
     const [imageUrl, setImageUrl] = useState('');
     const [error, setError] = useState('');

     const {user} = useAuth();

     const navigate = useNavigate();

     
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'products'),{
                title: title,
                price: Number(price),
                description: description,
                category: category,
                location: location,
                imageUrl: imageUrl,
                sellerId: user.uid,
                sellerEmail: user.email,
                createdAt: serverTimestamp()
            });

            navigate('/');
            
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                {error && <p className="auth-error">{error}</p>}
                <input type="text" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} />
                <input type="number" placeholder="Price" onChange={(e)=> setPrice(e.target.value)} value={price} />
                <input type="text" placeholder="Description" onChange={(e)=> setDescription(e.target.value)} value={description} />
                <input type="text" placeholder="Category" onChange={(e)=> setCategory(e.target.value)} value={category} />
                <input type="text" placeholder="Location" onChange={(e)=> setLocation(e.target.value)} value={location} />
                <input type="text" placeholder="Image Url" onChange={(e)=> setImageUrl(e.target.value)} value={imageUrl} />
                <button type="submit">List</button>
            </form>
        </>
    )
}

export default SellProduct;