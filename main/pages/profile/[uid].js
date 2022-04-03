import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from "../../utils/AuthContext";
import { firestore } from '../../utils/firebase';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
 

const UserProfile = () => {

    const [ userData, setUserData ] = useState(null);
    const [ ordersData, setOrdersData ] = useState (null);

    const { loadingUser, currentUser, logout } = useAuth();
    const router = useRouter();
    const { uid } = router.query

    const getUserData = async () => {
        const docRef = doc(firestore, "users", uid);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData(null);
        }
    }

    const getUserPurchases = async () => {
        const ordersRef = collection(firestore, 'orders');
        const q = query(ordersRef, where("userId", "==", userData.uid));

        const querySnapshot = await getDocs(q);
        let fetchedOrders = [];

        querySnapshot.forEach(doc=>{
            fetchedOrders.push(doc.data());
        })
        setOrdersData(fetchedOrders);
    }

    useEffect(() => {
        if (!loadingUser && !currentUser){
            router.push('/login')        
        }else if (!loadingUser && currentUser){
            getUserData()
        }
    }, [currentUser])

    useEffect( ()=>{
        if (userData){
            getUserPurchases();
        }
    }, [userData])


    return (
        <> { userData &&
            <div>
                <div>{userData && <Image width="150" height="150" alt="profile-pic" src={userData?.photoURL}/>}</div>
                <div>Name: {userData?.displayName} </div>
                <div>Email: {userData?.email} </div>
                <div>Ecopoints: {userData?.ecopoints ?? 0} </div>
                <div>Recent Orders:{JSON.stringify(ordersData)}
                </div>
            </div>
            }
        </>
    )
}

export default UserProfile
