import { useState } from "react"
import { Container, Button, Carousel } from "react-bootstrap"
import Image from 'next/image'
import { IoMdAdd } from "react-icons/io";

import FullHeightPage from "../components/FullHeightPage"
import ProductTag from "../components/ProductTag"

import styles from "../styles/product-info.module.css"

const ProductInfo = (productIndex) => {
    const [product, setProduct] = useState({
        name: "Classic Button-up Shirt",
        description: "Size: M, Condition: New",
        price: 1000,
        images: ["https://cdn-images.farfetch-contents.com/17/68/34/51/17683451_37032165_1000.jpg", "https://cdn-images.farfetch-contents.com/17/68/34/51/17683451_37032163_1000.jpg"],
        tags: ["men", "formal", "shirt"]
    });
    
    return (
        <FullHeightPage>
            <Container className={styles.pageContainer}>
                <Carousel className={styles.carousel}>
                    {
                        product.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <Image
                                    src={image}
                                    // layout="fill"
                                    width={500}
                                    height={500}
                                />
                            </Carousel.Item>
                        )
                    )}
                </Carousel>
                <Container className={styles.productInfoColumn}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productPrice}>${product.price}</span>
                    <p className={styles.productDescription}>{product.description}</p>
                    <div className={styles.productTags}>
                        { product.tags.map((tag, index) => (
                            <ProductTag key={index} tag={tag} />
                        ))}
                    </div>
                    <Button>
                        <IoMdAdd />
                        Add to Cart
                    </Button>
                </Container>
            </Container>
        </FullHeightPage>
    )
};

export default ProductInfo;