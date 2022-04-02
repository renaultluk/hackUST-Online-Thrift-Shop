import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import Link from "next/link";
import Image from 'next/image';

import { collection, query, startAfter, limit, getDocs } from "firebase/firestore"; 
import { firestore } from "../../utils/firebase";

import FullHeightPage from "../../components/FullHeightPage";

import styles from "../../styles/market.module.css";

const ProductBrief = (props) => {
    const { product } = props;
    return (
        <Link href={"/market/" + product.id}>
            <Container className={styles.productBrief}>
                <Container className={styles.productImage}>
                    <Image
                        src={product.image}
                        // layout="fill"
                        width={150}
                        height={150}
                    />
                </Container>
                <span className={styles.productName}>{product.name}</span>
                <span>${product.price}</span>
            </Container>
        </Link>
    );
}


const Market = (props) => {
    const [items, setItems] = useState([{
        id: 1,
        name: "Classic Button-up Shirt",
        price: 1000,
        image: "https://cdn-images.farfetch-contents.com/17/68/34/51/17683451_37032165_1000.jpg"
    }]);
    
    return (
        <FullHeightPage>
            <Row>
                <Col>
                    <h1>Market</h1>
                </Col>
                <Button></Button>
            </Row>
            <Container>
                {items.map(item => (
                    <ProductBrief key={item.id} product={item} />
                ))}
            </Container>
        </FullHeightPage>
    )
}

export default Market;