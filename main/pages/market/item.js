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
import { IoWaterOutline } from 'react-icons/io5'


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
    }, [category, id])

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
            <div className={styles.outerContainer}>
                {product && Object.keys(product).length ?
                    <div className={styles.upperOuterContainer}>
                        <div className={styles.productImageDiv}>
                            <Carousel className={styles.carousel}>
                                {
                                    product.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                src={image}
                                                style={{width: '100%', maxHeight:'400px', height: 'fit-content'}}
                                            />
                                        </Carousel.Item>
                                    )
                                )}
                            </Carousel>
                        </div>
                        <div className={styles.productInfoDiv}>
                                <p className={styles.productBrand}>{product.brand}</p>
                                <p className={styles.productName}>{product.name}</p>
                                <p className={styles.productEco}><IoWaterOutline style={{color:'blue'}} /> <span className={styles.ecotext}>{`${product.ecostat??0}g`}</span></p>
                                <p className={styles.productOgPrice}>{`HK$${product.originalPrice??0}`}</p>
                                <p className={styles.productPrice}>HK${product.price}</p>
                                <button onClick={addToCart} className={styles.cartButton}>
                                    <IoMdAdd />
                                    Add to Cart
                                </button>
                        </div>
                    </div> 
                    : null
                }

                { product&&
                    <div className={styles.descriptionDiv}>
                        <p className={styles.descriptionTitle}>Product Details</p>
                        <p className={styles.description}>{product.description}</p>
                        
                    </div>
                }


            </div>
        </FullHeightPage>
    )
};

export default ProductInfo;