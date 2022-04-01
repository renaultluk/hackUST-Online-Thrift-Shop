import { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Image from "next/image";

import useShoppingStore from "../utils/ShoppingStore";
import FullHeightPage from "../components/FullHeightPage";

import styles from "../styles/shopping-cart.module.css";

const ShoppingCart = () => {
    const shopStore = useShoppingStore();

    let total = shopStore.shoppingCart.reduce((acc, item) => acc + item.price, 0);

    return (
        <FullHeightPage>
            <Container>
                <h1>Shopping Cart</h1>
                <Container>
                    {shopStore.shoppingCart.map(item => (
                        <Row key={item.id} className={styles.productRow}>
                            
                            <Col>
                                <h3>{item.name}</h3>
                            </Col>
                            <Col>
                                <p>Price: {item.price}</p>
                                <Button
                                    variant="danger"
                                    onClick={() => shopStore.removeFromShoppingCart(item)}
                                >
                                    -
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Container>
                <Row>
                    <Col>
                        <h3>Total: {total}</h3>
                    </Col>
                    <Col>
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