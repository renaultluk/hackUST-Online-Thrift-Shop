import { useState } from "react"
import { Container, Button, Carousel } from "react-bootstrap"
import Image from 'next/image'

import FullHeightPage from "../components/FullHeightPage"

import styles from "../styles/product-info.module.css"

const ProductInfo = (productIndex) => {
    const [product, setProduct] = useState({
        name: "name",
        description: "description",
        price: 0,
        images: [""],
        tags: [""]
    });
    
    return (
        <FullHeightPage>
            <Container>
                {/* <Carousel>
                    {
                        product.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <Image
                                    src={image}
                                    layout="fill"
                                />
                            </Carousel.Item>
                        )
                    )}
                </Carousel> */}
                <Container className={styles.productInfoColumn}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productPrice}>${product.price}</span>
                    <p className={styles.productDescription}>{product.description}</p>
                </Container>
            </Container>
        </FullHeightPage>
    )
};

export default ProductInfo;