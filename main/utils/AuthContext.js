import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { firestore } from './firebase';
import { doc, setDoc } from "firebase/firestore"; 
 

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}


export default function AuthProvider({ children }) {

    const [loadingUser, setLoadingUser] = useState(true)
    const [currentUser, setCurrentUser] = useState()

    const provider = new GoogleAuthProvider();

    const router = useRouter();

    const login = () => {
        signInWithPopup(auth, provider) 
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log({ credential, token, user });

                // Add/update user collection
                const userRef = doc(firestore, 'users', user.uid);
                setDoc(userRef, 
                    {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid,
                    }, 
                    { merge: true });
                

                setCurrentUser(user);
                setLoadingUser(false);
                router.push('/');
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // console.log({ errorCode, errorMessage, email, credential });
                setCurrentUser(null);
                setLoadingUser(false);
            });
    };

    const logout = () => {
        auth.signOut();
        setCurrentUser(null);
        setLoadingUser(false);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);         
            }
            setLoadingUser(false);
            // console.log(user);
        });
    }, [currentUser]);

    useEffect(()=>{
        // console.log(loadingUser)
    }, [loadingUser])


    const value = { 
        currentUser,
        loadingUser,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
