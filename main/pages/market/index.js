import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";

import { collection, query, startAfter, limit, getDocs, doc, where, orderBy } from "firebase/firestore"; 
import { firestore, productsRef } from "../../utils/firebase";

import useForceUpdate from "../../utils/useForceUpdate";

import FullHeightPage from "../../components/FullHeightPage";

import styles from "../../styles/market.module.css";

// const ProductBrief = (props) => {
//     const { product } = props;
//     return (
//             <Card 
//                 style={{
//                     width: '18rem',
//                     height: '18rem',
//                 }}
//                 onClick={}
//             >
//                 <Card.Img variant="top" src={product.image} />
//                 <Card.Body>
//                     <Card.Title>{product.name}</Card.Title>
//                     <Card.Text>{product.price}</Card.Text>
//                 </Card.Body>
//             </Card>
//     );
// }

const Market = (props) => {
    const router = useRouter();
    const queryParams = router.query;
    const category = queryParams.category; // TODO: Revise for general

    const [items, setItems] = useState([{
        id: 1,
        name: "Classic Button-up Shirt",
        price: 1000,
        images: ["https://cdn-images.farfetch-contents.com/17/68/34/51/17683451_37032165_1000.jpg"]
    }]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
    
            const currentCollection = collection(firestore, "products", category, category);
            
            const q = tags.length ?
                query(currentCollection, where("tags", "array-contains", tags), orderBy("name"), limit(10)) :
                query(currentCollection, limit(10), orderBy("name"));
            
            const querySnapshot = await getDocs(q);
            const tmpItems = querySnapshot.docs.map(doc => {
                let tmp = doc.data();
                tmp.id = doc.id;
                return tmp;
            });
            setItems(items.concat(tmpItems));
        }

        fetchData().catch(err => console.log(err));
    } , []);
    
    const gotoItem = (id) => {
        router.push({
            pathname: "/market/item",
            query: {
                category: category,
                ind: id
            }
        });
    }

    
    return (
        <FullHeightPage>
            <Row>
                <Col>
                    <h1>Market</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Button>
                        Filter
                    </Button>
                </Col>
            </Row>
                <Container>
                    <Row>
                        {items.map(item => (
                            // <ProductBrief key={item.id} product={item} />
                            <Col key={item.id} xs={{ span: 12, order: 3 }} md={{ span: 6, order: 1 }}>
                                <Card 
                                style={{
                                        width: '18rem',
                                        height: '18rem',
                                    }}
                                    onClick={() => gotoItem(item.id)}
                                >
                                    <Card.Img variant="top" src={item.images[0]} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>${item.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
        </FullHeightPage>
    )
}

export default Market;