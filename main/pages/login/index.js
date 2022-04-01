import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from "../../src/contexts/AuthContext";

export default function Login() {

    const { loadingUser, currentUser, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loadingUser && currentUser){
            router.push('/')        
        }
      }, [currentUser])

    return (
        <>
            <button onClick={login}>Login with Google</button>
        </>
    )
}
