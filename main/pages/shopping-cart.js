import Head from 'next/head'
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";

import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { firestore } from "../utils/firebase";
import { useAuth } from "../utils/AuthContext";

import useShoppingStore from "../utils/ShoppingStore";
import FullHeightPage from "../components/FullHeightPage";

import styles from "../styles/shopping-cart.module.css";
import generateOrderId from "../utils/utils";

const ShoppingCart = () => {
    const shopStore = useShoppingStore();
    const { loadingUser, currentUser } = useAuth();
    const router = useRouter();

    const [cart, setCart] = useState([]);
    
    const fetchData = async () => {

        let results = []
        shopStore.shoppingCart.forEach(async item => {
            const docRef = doc(firestore, 'products', item.category, item.category, item.index);
            const itemSnap = await getDoc(docRef);

            if (itemSnap.exists) {
                let tmpItem = itemSnap.data();
                
                tmpItem = {...tmpItem, index: item.index};

                results = [...results, tmpItem];
                setCart(results)
            }
        })
    }

    const handleCheckOutButton = () => {
        /**
         * For each checkout, we create an orderId linking a list of productId with embedded info and userId
         */
        const orderId = generateOrderId()
        const order = {
            orderId : orderId,
            orderDate : Timestamp.now(),
            userId : currentUser.uid,
            totalSpending: cart.reduce((acc, item) => acc + item.price, 0),
            productsBought : cart,
        }

        const orderRef = doc(firestore, 'orders', orderId);
        setDoc(orderRef, order , { merge: true });

        setCart([]);
        shopStore.clearShoppingCart();
        router.push('/successful');
    }

    useEffect(() => {
        fetchData().catch(err => console.log(err));
    }, []);

    useEffect( () => {
        console.log(shopStore.shoppingCart)
        console.log('cart' , cart)
    }, [cart])



    let total = cart.reduce((acc, item) => acc + item.price, 0);


    return (

        <>
        <Head>
            <title>Thriftee | Shopping Cart</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/thriftee_logo.ico" />
        </Head>
        <FullHeightPage>
            <Container>
                <h1 className={styles.titleHeader}>Shopping Cart</h1>
                <Container>
                    {
                    cart.map((item, index) => {
                        return (
                        <Row key={index} className={styles.productRow}>
                            <img
                                src={item.images[0]}
                                className={styles.productImage}
                            />
                            <Col>
                                <h3 className={styles.productName}>{item.name}</h3>
                            </Col>
                            <Col xs lg={2} className="d-flex justify-content-end align-items-center">
                                <span className={styles.pricetag}>HK${item.price}</span>
                                <Button
                                    variant="danger"
                                    className={styles.removeButton}
                                    onClick={() => {
                                            shopStore.removeFromShoppingCart(item)
                                            setCart(cart => cart.filter(i => i !== item))
                                        }
                                    }
                                >
                                    -
                                </Button>
                            </Col>
                        </Row>)
                        })
                        }
                </Container>
                <Row className="mt-2">
                    <Col>
                        <h3 className={styles.priceTotal}>Total: $HK{total}</h3>
                    </Col>
                    <Col xs lg={2}  className="d-flex justify-content-end">
                        {  
                        !loadingUser&&currentUser&&
                            <Button
                                variant="success"
                                className={styles.checkout}
                                onClick={handleCheckOutButton}
                            >Checkout</Button>
                        }

                        {  
                        !loadingUser&&!currentUser&&
                            <Button
                                href="/login"
                                className={styles.checkout}
                                variant="success"
                            >Login/Signup</Button>
                        }
                    </Col>

                </Row>
            </Container>
        </FullHeightPage>
        </>
    )
}

export default ShoppingCart