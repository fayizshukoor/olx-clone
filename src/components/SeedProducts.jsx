import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import useAuth from "../hooks/useAuth";

function SeedProducts() {
    const { user } = useAuth();

    const products = [
        {
            title: "Samsung Galaxy S24",
            price: 48000,
            description: "Samsung Galaxy S24, lightly used and in excellent condition.",
            category: "Mobiles",
            location: "Kochi",
            imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Dell Inspiron Laptop",
            price: 42000,
            description: "Dell Inspiron laptop suitable for work and study.",
            category: "Laptops",
            location: "Calicut",
            imageUrl: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Nike Running Shoes",
            price: 4500,
            description: "Nike running shoes, barely used and in great condition.",
            category: "Fashion",
            location: "Kannur",
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Modern Sofa",
            price: 22000,
            description: "Comfortable three-seater sofa in excellent condition.",
            category: "Furniture",
            location: "Kochi",
            imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "PlayStation 5",
            price: 45000,
            description: "PS5 console with controller, lightly used.",
            category: "Gaming",
            location: "Calicut",
            imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Royal Enfield Helmet",
            price: 3000,
            description: "Original Royal Enfield riding helmet in very good condition.",
            category: "Accessories",
            location: "Malappuram",
            imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Wooden Study Table",
            price: 6500,
            description: "Solid wooden study table with storage drawer.",
            category: "Furniture",
            location: "Calicut",
            imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Apple Watch Series 9",
            price: 28000,
            description: "Apple Watch Series 9 with original charger.",
            category: "Electronics",
            location: "Kochi",
            imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Acoustic Guitar",
            price: 7500,
            description: "Good quality acoustic guitar, perfect for beginners.",
            category: "Music",
            location: "Kannur",
            imageUrl: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Honda Activa",
            price: 68000,
            description: "Honda Activa in good condition with regular servicing.",
            category: "Bikes",
            location: "Calicut",
            imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
        }
    ];

    async function seedProducts() {
        if (!user) return;

        try {
            for (const product of products) {
                await addDoc(collection(db, "products"), {
                    ...product,
                    sellerId: user.uid,
                    sellerEmail: user.email,
                    createdAt: serverTimestamp()
                });
            }

            alert("Products added successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={seedProducts}>
            Add Dummy Products
        </button>
    );
}

export default SeedProducts;