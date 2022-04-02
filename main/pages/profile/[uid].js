import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from "../../src/contexts/AuthContext";
import { db } from '../../src/firebase';
import { doc, getDoc } from "firebase/firestore";
 

const UserProfile = () => {

    const [ userData, setUserData ] = useState(null)

    const { loadingUser, currentUser, logout } = useAuth();
    const router = useRouter();
    const { uid } = router.query

    const getUserData = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData(null)
        }
    }

    useEffect(() => {
        if (!loadingUser && !currentUser){
            router.push('/login')        
        }else if (!loadingUser && currentUser){
            getUserData()
        }
    }, [currentUser])


    return (
        <> { userData &&
            <div>
                <div>{userData && <Image width="150" height="150" alt="profile-pic" src={userData?.photoURL}/>}</div>
                <div>Name: {userData?.displayName} </div>
                <div>Email: {userData?.email} </div>
                <div>Ecopoints: {userData?.ecopoints ?? 0} </div>
            </div>
            }
        </>
    )
}

export default UserProfile
