import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from "../../utils/AuthContext";
import { firestore } from '../../utils/firebase';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import styles from "../../styles/profile.module.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { getDateString } from '../../utils/utils';


const UserProfile = () => {

    const [ userData, setUserData ] = useState(null);
    const [ ordersData, setOrdersData ] = useState (null);
    const [ donationsData, setDonationsData ] = useState (null);
    const [ activeTab, setActiveTab ] = useState(0)

    const { loadingUser, currentUser, logout } = useAuth();
    const router = useRouter();
    const { uid } = router.query

    const tabs = ['Account Info', 'Thriftee Dollars', 'Orders'];

    const getUserData = async () => {
        const docRef = doc(firestore, "users", uid);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData(null);
        }
    }

    const changeTabs = (e) => {
        setActiveTab(e.target.id);
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

    const getUserDonations = async () => {
        const ordersRef = collection(firestore, 'donations');
        const q = query(ordersRef, where("userId", "==", userData.uid));

        const querySnapshot = await getDocs(q);
        let fetchedDonations = [];

        querySnapshot.forEach(doc=>{
            fetchedDonations.push(doc.data());
        })
        setDonationsData(fetchedDonations);
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
            getUserDonations();
        }
        console.log(ordersData)
    }, [userData, activeTab])


    return (
        <> { userData &&
            <div className={styles.outerContaienr}>
                <div className={styles.greetingsContainer}>
                    <div className={styles.greetingsLeft}>
                        <h2 className={styles.hello}>Hello</h2>
                        <h1 className={styles.name}> {userData?.displayName} </h1>
                    </div>
                    <div className={styles.greetingsRight}>
                        <img className={styles.qrCode} src={userData?.photoURL}/>
                    </div>
                </div>

                <div className={styles.tabContainer}>
                    {
                        tabs.map((tab, i)=>{
                            return <button className={activeTab == i ? styles.activeTabButton : styles.tabButtons} id={i} key={i} onClick={changeTabs}>
                                {tab}
                            </button>
                        })
                    }
                </div>
                
                <div className={styles.contentTabContainer}>
                {(activeTab == 0) &&

                    <div className={styles.contentInfoContainer}>
                        <label className={styles.infoLabel}>Full Name</label>
                        <p className={styles.infoData}>{userData?.displayName}</p>
                        <label className={styles.infoLabel}>Email Address</label>
                        <p className={styles.infoData}>{userData?.email}</p>
                        <label className={styles.infoLabel}>Address</label>
                        <p className={styles.infoData}>653 Brook St.
                        Winter Springs, FL 32708</p>
                        <label className={styles.infoLabel}>Saved Card</label>
                        <p className={styles.infoData}>
                            MasterCard **** **** **** 9527
                        </p>
                    </div>
                }
                {(activeTab == 1) &&

                    <div className={styles.contentInfoContainer}>
                        <p className={styles.points}> {userData?.ecopoints ?? 0} <span style={{fontSize:'1rem', fontWeight: 'normal', marginLeft:'1rem', paddingTop:'0.5rem'}}>Thriftee Dollars</span></p>

                        <div className={styles.donationsContainer}> 
                            <div className={styles.infoLabel}> Past Donations </div>
                            <div className={styles.donations}>
                                {
                                donationsData.map((donation,i) => {
                                    return (
                                    <div key={`donation-${i.toString()}`} className={styles.donationRow}>
                                        <p className={styles.donationRowLabels}>{getDateString(donation.donationDate?.seconds)}</p>
                                        <p className={styles.donationRowLabels}>{donation.totalWeight}kg</p>
                                        <p className={styles.donationRowLabels}>{donation.estimatedRewards?.partialVoucher}TD</p>
                                    </div>)
                                })
                                }

                            </div>
                        </div>
                    </div>
                }
                {(activeTab == 2) &&
                    <div className={styles.orderOuterContainer}>
                            {ordersData.map((order, idx) => {
                                return (
                                <div className={styles.orderContainer} key={`${order.orderId}`}>
                                    <div className={styles.orderImageDiv}>
                                        <img className={styles.orderImage} src={order.productsBought[0].images[0]}/>
                                    </div>
                                    <p className={styles.productBrand}>Order #{order.orderId}</p>
                                    <p className={styles.productName}>Total Spending: HK${order.totalSpending??0}</p>
                                    <p className={styles.productName}>Order Date: {getDateString(order.orderDate.seconds)}</p>
                                    <p className={styles.productName}>Delivery Date: {getDateString(order.orderDate.seconds + 1000000)}</p>
                                </div>
                                
                                )
                            })
                            }

                    </div>
                }



                </div>



            </div>
            }
        </>
    )
}

export default UserProfile
