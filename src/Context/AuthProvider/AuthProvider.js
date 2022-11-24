import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);


    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider)
    }

    const RegisterWithEmailPassword = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const LoginWithEmailPassword = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setIsLoading(true);
        return signOut(auth);
    }

    const updateUserInfo = (userInfo) => {
        console.log('user to update', user);
        return updateProfile(auth.currentUser, userInfo)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            (currentUser) => {
                console.log('user in auth state change', currentUser);
                setUser(currentUser)
                setIsLoading(false);
            });
        return () => unsubscribe();

    }, [])

    const authInfo = {
        user,
        isLoading,
        setIsLoading,
        providerLogin,
        logOut,
        LoginWithEmailPassword,
        RegisterWithEmailPassword,
        updateUserInfo
    };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;