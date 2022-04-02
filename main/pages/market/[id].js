import { useState } from "react"
import { Container, Button, Carousel } from "react-bootstrap"
import Image from 'next/image'

import FullHeightPage from "../../components/FullHeightPage"
import ProductTag from "../../components/ProductTag"

import styles from "../../styles/product-info.module.css"

export const getStaticPaths = async () => {
    const products = await fetch("http://localhost:3000/api/products").then(res => res.json());
    const paths = products.map(product => ({
        params: {
            id: product.id.toString()
        }
    }));
    return {
        paths,
        fallback: false
    };
};

export const getStaticProps = async(context) => {
    const productId = context.params.id;
    const product = await fetch(`http://localhost:3000/api/products/${productId}`).then(res => res.json());
    return {
        props: {
            product
        }
    };
}

const ProductInfo = ({ product }) => {
    // const [product, setProduct] = useState({
    //     name: "name",
    //     description: "description",
    //     price: 0,
    //     images: [""],
    //     tags: ["men", "leisure", "shirt"]
    // });
    
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
                    <div className={styles.productTags}>
                        { product.tags.map((tag, index) => (
                            <ProductTag key={index} tag={tag} />
                        ))}
                    </div>
                </Container>
            </Container>
        </FullHeightPage>
    )
};

export default ProductInfo;