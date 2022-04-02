import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from "../../src/contexts/AuthContext";

export default function Profile() {

    const { loadingUser, currentUser, logout } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (!loadingUser && !currentUser){
            router.push('/login')        
        } else if (!loadingUser && currentUser){
            router.push(`/profile/${currentUser.uid}`)
        }
      }, [currentUser])

    return (
        <>

        </>
    )
}
