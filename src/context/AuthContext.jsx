/* eslint-disable react-refresh/only-export-components */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] =  useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setUser(user);
            setLoading(false);
        })

        return unsubscribe; 
    },[])

    async function signup(email, password) {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password) {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        await signOut(auth);
    }



    return <AuthContext.Provider value={{signup, login, logout, user, loading}}>
        {children}
    </AuthContext.Provider>
}

