/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { db } from "../services/firebase";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
    const { user } = useAuth();

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (!user) return;
    
        async function fetchWishlist() {
            try {
                const snapshot = await getDoc(
                    doc(db, "users", user.uid)
                );
    
                const wishlistIds = snapshot.data()?.wishlist || [];
    
                setWishlist(wishlistIds);
            } catch (error) {
                console.error(error);
            }
        }
    
        fetchWishlist();
    }, [user]);

    async function addToWishlist(productId) {
        if (!user) return;

        await setDoc(
            doc(db, "users", user.uid),
            {
                wishlist: arrayUnion(productId)
            },
            { merge: true }
        );

        setWishlist(prev => [...prev, productId]);
    }

    async function removeFromWishlist(productId) {
        if (!user) return;

        await setDoc(
            doc(db, "users", user.uid),
            {
                wishlist: arrayRemove(productId)
            },
            { merge: true }
        );

        setWishlist(prev =>
            prev.filter(id => id !== productId)
        );
    }

    function isWishlisted(productId) {
        return wishlist.includes(productId);
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isWishlisted
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}