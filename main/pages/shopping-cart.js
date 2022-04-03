import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Image from "next/image";

import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { firestore } from "../utils/firebase";

import useShoppingStore from "../utils/ShoppingStore";
import FullHeightPage from "../components/FullHeightPage";

import styles from "../styles/shopping-cart.module.css";

const ShoppingCart = () => {
    const shopStore = useShoppingStore();
    const [cart, setCart] = useState([]);
    // const cart = []
    // let total = 0;
    
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
                        <Button
                            variant="success"
                        >Checkout</Button>
                    </Col>

                </Row>
            </Container>
        </FullHeightPage>
    )
}

export default ShoppingCart