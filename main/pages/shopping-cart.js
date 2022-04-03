import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Image from "next/image";

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

    const [cart, setCart] = useState([]);
    
    const fetchData = async () => {
        let i = 1;
        shopStore.shoppingCart.forEach(async item => {
            
            const docRef = doc(firestore, 'products', item.category, item.category, item.index);
            const itemSnap = await getDoc(docRef);
            
            if (itemSnap.exists) {
                let tmpItem = itemSnap.data();
                tmpItem.index = item.index;
                // cart.push(tmpItem);
                console.log(cart, i);
                i++;

                setCart(cart => [...cart, tmpItem]);
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
    }

    useEffect(() => {
        fetchData().catch(err => console.log(err));
    }, []);

    let total = cart.reduce((acc, item) => acc + item.price, 0);
    // let total = 0;
    console.log(total);
    console.log("rendered");

    return (
        <FullHeightPage>
            <Container>
                <h1>Shopping Cart</h1>
                <Container>
                    {cart.map((item, index) => (
                        <Row key={index} className={styles.productRow}>
                            <Image
                                src={item.images[0]}
                                width={100}
                                height={100}
                                className={styles.productImage}
                            />
                            <Col>
                                <h3>{item.name}</h3>
                            </Col>
                            <Col xs lg={2} className="d-flex justify-content-end align-items-center">
                                <span>Price: {item.price}</span>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                            shopStore.removeFromShoppingCart(item)
                                            setCart(cart => cart.filter(i => i !== item))
                                        }
                                    }
                                >
                                    -
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Container>
                <Row className="mt-2">
                    <Col>
                        <h3>Total: {total}</h3>
                    </Col>
                    <Col xs lg={2}  className="d-flex justify-content-end">
                        {  
                        !loadingUser&&currentUser&&
                            <Button
                                variant="success"
                                onClick={handleCheckOutButton}
                            >Checkout</Button>
                        }

                        {  
                        !loadingUser&&!currentUser&&
                            <Button
                                href="/login"
                                variant="success"
                            >Login/Signup</Button>
                        }
                    </Col>

                </Row>
            </Container>
        </FullHeightPage>
    )
}

export default ShoppingCart