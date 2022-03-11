
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';


const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}
export default function AuthProvider({ children }) {
    const [currentUser, setcurrentUser] = useState()

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    const value = {
        currentUser,
        signUp,
        login,
        logout,
        resetPassword,
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user)
            return unsubscribe
        })
    }, [])



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
