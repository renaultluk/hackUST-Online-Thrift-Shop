import Head from 'next/head'
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

import { IoWaterOutline } from 'react-icons/io5'


const Market = (props) => {
    const router = useRouter();
    const queryParams = router.query;
    const category = queryParams.category; // TODO: Revise for general

    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
    
            const currentCollection = collection(firestore, "products", category, category);
            
            const q = tags.length ?
                query(currentCollection, where("tags", "array-contains", tags), orderBy("name"), limit(10)) :
                query(currentCollection, limit(10), orderBy("name"));
            
            const querySnapshot = await getDocs(q);

            let itemResults = []
            querySnapshot.forEach(doc=>{
                let tmp = doc.data();
                tmp.id = doc.id;
                itemResults.push(tmp)
            })

            setItems(itemResults);
        }

        fetchData().catch(err => console.log(err));

    } , [category]);
    
    const gotoItem = (id) => {
        router.push({
            pathname: "/market/item",
            query: {
                category: category,
                id: id
            }
        });
    }

    
    return (
        <>
        <Head>
            <title>Thriftee | {category}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/thriftee_logo.ico" />
        </Head>
        <FullHeightPage>
            <Row>
                <Col>
                    <h2 style={{fontSize: '1.5rem', fontWeight:'bold',  margin: '3rem 0 0 0'}}>{category}</h2>
                    <h1 style={{fontSize: '2rem', fontWeight:'bold', margin: '0 0 3rem 0'}}>New Arrivals</h1>
                </Col>
            </Row>
            <div className={styles.productsMainContainer}>
                        {items.map(item => (
                            <ProductCard key={item.id} item={item} />
                        ))}
            </div>
        </FullHeightPage>
        </>
    )
}

const ProductCard = (item) => {
    const router = useRouter();
    const queryParams = router.query;
    const category = queryParams.category;

    return (
        <a href={`/market/item/?category=${category}&id=${item.item.id}`} className={styles.productCardContainer}>
            <div className={styles.imageContainer}>
                <img src={item.item.images[0]} alt={item.item.id} />
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.productLeft}>
                    <p className={styles.productBrand}>{item.item.brand}</p>
                    <p className={styles.productName}>{item.item.name}</p>
                    <p className={styles.productEco}><IoWaterOutline style={{color:'blue'}} /> {`${item.item.ecostat??0}L`}</p>
                </div>
                <div className={styles.productRight}>
                    <p className={styles.productOgPrice}>{`HK$${item.item.originalPrice??0}`}</p>
                    <p className={styles.productPrice}>{`HK$${item.item.price??0}`}</p>
                </div>
            </div>


        </a>
        )

}


export default Market;