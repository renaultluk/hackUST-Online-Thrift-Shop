import { useEffect, useState } from "react"
import { Container, Button, Carousel } from "react-bootstrap"
import Image from 'next/image'
import { useRouter } from "next/router";
import { IoMdAdd } from "react-icons/io";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebase"

import FullHeightPage from "../../components/FullHeightPage"
import ProductTag from "../../components/ProductTag"

import styles from "../../styles/product-info.module.css"

const ProductInfo = () => {
    const router = useRouter();
    const queryParams = router.query;
    const category = queryParams.category;
    const id = queryParams.ind;
    
    const [product, setProduct] = useState({
        name: "name",
        description: "description",
        price: 0,
        images: ["https://cdn-images.farfetch-contents.com/17/68/34/51/17683451_37032165_1000.jpg"],
        tags: ["men", "leisure", "shirt"]
    });


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