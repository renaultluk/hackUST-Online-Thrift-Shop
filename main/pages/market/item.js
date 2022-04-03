import { useEffect, useState } from "react"
import { Container, Button, Carousel, Alert } from "react-bootstrap"
import Image from 'next/image'
import { useRouter } from "next/router";
import { IoMdAdd } from "react-icons/io";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebase"
import useShoppingStore from "../../utils/ShoppingStore";

import FullHeightPage from "../../components/FullHeightPage"
import ProductTag from "../../components/ProductTag"

import styles from "../../styles/product-info.module.css"

const ProductInfo = () => {
    const router = useRouter();
    const queryParams = router.query;
    const category = queryParams.category;
    const id = queryParams.id;

    const shopStore = useShoppingStore();
    
    const [product, setProduct] = useState({});
    const [showAddToCart, setShowAddToCart] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(firestore, "products", category, category, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists) {
                const tmp = docSnap.data();
                setProduct(tmp);
            }
        }

        fetchData().catch(err => console.log(err));
    }, [])

    const addToCart = () => {
        const item = {
            index: id,
            category: category,
        }
        shopStore.addToShoppingCart(item);
        setShowAddToCart(true);
        window.setTimeout(() => {setShowAddToCart(false)}, 8000);
    }
    
    return (
        <FullHeightPage>
            { showAddToCart ? 
                <Alert
                    variant="success"
                    transition={true}
                    dismissible
                    className={styles.alert}
                >
                    Added to Cart
                </Alert> : null
            }
            <Container className={styles.pageContainer}>
                { Object.keys(product).length ?
                    <>
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
                            <Button onClick={addToCart}>
                                <IoMdAdd />
                                Add to Cart
                            </Button>
                        </Container>
                    </> : null
                }
            </Container>
        </FullHeightPage>
    )
};

export default ProductInfo;