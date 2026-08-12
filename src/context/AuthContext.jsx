/* eslint-disable react-refresh/only-export-components */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../services/firebase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    async function signup(email, password) {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    return <AuthContext.Provider value={{signup}}>
        {children}
    </AuthContext.Provider>
}

