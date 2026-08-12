import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";

function TestProduct(){


   async function handleAddProduct(){
        try {
            await addDoc(collection(db, 'products'),{
                title: "iPhone 13",
                price: 35000,
                description: "Good condition",
                category: "Mobiles",
                location: "Calicut",
                imageUrl: "https://example.com/iphone.jpg",
                sellerId: "test-seller",
                sellerEmail: "test@example.com",
                createdAt: serverTimestamp()
            })
        } catch (error) {
            console.error(error);
        }
    }
    return <button onClick={handleAddProduct}>Add Test product</button>
}

export default TestProduct;