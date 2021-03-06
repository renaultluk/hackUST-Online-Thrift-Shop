import Head from 'next/head'
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";

import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { firestore } from "../utils/firebase";
import { useAuth } from "../utils/AuthContext";

import useShoppingStore from "../utils/ShoppingStore";
import FullHeightPage from "../components/FullHeightPage";

import styles from "../styles/shopping-cart.module.css";
import generateOrderId from "../utils/utils";

import { truckingEmissions, WAREHOUSE_LOCATION, DISTRICT_COORDS, TRUCKING_OPTIONS, expectedDeliveryDate } from '../utils/CalculationUtils'

const ShoppingCart = () => {
    const shopStore = useShoppingStore();
    const { loadingUser, currentUser } = useAuth();
    const router = useRouter();

    const [emissions, setEmissions ] = useState();
    const [days, setDays ] = useState();
    const [districtSelected, setDistrictSelected ] = useState(false);
    const [truckingSelected, setTruckingSelected ] = useState(false);
    const [cart, setCart] = useState([]);
    
    const fetchData = async () => {

        let results = []
        shopStore.shoppingCart.forEach(async item => {
            const docRef = doc(firestore, 'products', item.category, item.category, item.index);
            const itemSnap = await getDoc(docRef);

            if (itemSnap.exists) {
                let tmpItem = itemSnap.data();
                
                tmpItem = {...tmpItem, index: item.index};

                results = [...results, tmpItem];
                setCart(results)
            }
        })
    }

    const selectDistrict = (e) => {
        setDistrictSelected(e.target.value);
    }

    const selectTrucking = (e) => {
        setTruckingSelected(e.target.value);
    }

    const handleCheckOutButton = () => {
        /**
         * For each checkout, we create an orderId linking a list of productId with embedded info and userId
         */
        const orderId = generateOrderId()
        const order = {
            orderId : orderId,
            orderDate : Timestamp.now(),
            userId : currentUser.uid,
            totalSpending: cart.reduce((acc, item) => acc + item.price, 0),
            productsBought : cart,
            emissions: emissions,
            shippingDistrict: districtSelected,
            deliveryMode: truckingSelected,
            estimatedDays: days,
            estimatedDelivery: expectedDeliveryDate(days)
        }

        const orderRef = doc(firestore, 'orders', orderId);
        setDoc(orderRef, order , { merge: true });

        setCart([]);
        shopStore.clearShoppingCart();
        router.push('/successful');
    }

    useEffect(() => {
        fetchData().catch(err => console.log(err));
    }, []);

    useEffect( () => {
        let total = cart.reduce((acc, item) => acc + item.price, 0);

        if(districtSelected == 'Select District' || !districtSelected || truckingSelected == 'Select Delivery' || !truckingSelected){
            setEmissions(null);
            setDays(null);
        } else {
            const calcuations = truckingEmissions(truckingSelected, WAREHOUSE_LOCATION, DISTRICT_COORDS[districtSelected], total)

            const emissionCalculation = calcuations[0];
            const daysCalculation = calcuations[1];

            console.log(emissionCalculation)

            setEmissions(emissionCalculation);
            setDays(daysCalculation);
        }

    }, [districtSelected, cart, truckingSelected])



    let total = cart.reduce((acc, item) => acc + item.price, 0);
    

    return (

        <>
        <Head>
            <title>Thriftee | Shopping Cart</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/thriftee_logo.ico" />
        </Head>
        <FullHeightPage>
            <Container>
                <h1 className={styles.titleHeader}>Shopping Cart</h1>
                <Container>
                    {
                    cart.map((item, index) => {
                        return (
                        <Row key={index} className={styles.productRow}>
                            <img
                                src={item.images[0]}
                                className={styles.productImage}
                            />
                            <Col>
                                <h3 className={styles.productName}>{item.name}</h3>
                            </Col>
                            <Col xs lg={2} className="d-flex justify-content-end align-items-center">
                                <span className={styles.pricetag}>HK${item.price}</span>
                                <Button
                                    variant="danger"
                                    className={styles.removeButton}
                                    onClick={() => {
                                            shopStore.removeFromShoppingCart(item)
                                            setCart(cart => cart.filter(i => i !== item))
                                        }
                                    }
                                >
                                    -
                                </Button>
                            </Col>
                        </Row>)
                        })
                        }
                </Container>
                <div className={styles.purchaseSummary}>
                    <div className={styles.selections}>
                        <label for="district" className={styles.districtDropdownLabel}>Shipping District</label>
                        <select id="district" name="district" onChange={selectDistrict} className={styles.districtDropdown}>
                            {
                                Object.keys(DISTRICT_COORDS).map(district => {
                                    return <option key={district} value={district}>{district}</option>
                                })
                            }
                        </select>

                        <label for="trucking" className={styles.districtDropdownLabel}>Delivery Mode</label>
                        <select id="trucking" name="trucking" onChange={selectTrucking} className={styles.districtDropdown}>
                            {
                                Object.keys(TRUCKING_OPTIONS).map(trucking => {
                                    return <option key={trucking} value={trucking}>{trucking}</option>
                                })
                            }
                        </select>

                    </div>

                    <div className={styles.info_and_checkout}>
                        <div className={styles.info_row}>
                            <h3 className={styles.priceTotal}>Est. Delivery Days: </h3>
                            <h3 className={styles.priceTotalRight}>{ days ? `${days}~ days` : ''}</h3>
                        </div>
                        <div className={styles.info_row}>
                        <h3 className={styles.priceTotal}>Est. CO2 Emissions: </h3>
                            <h3 className={styles.priceTotalRight}>{ emissions ? `${emissions}g` : ''}</h3>
                        </div>
                        <div className={styles.info_row}>
                            <h3 className={styles.priceTotal}>Total:</h3>
                            <h3 className={styles.priceTotalRight}>{ total ? `HK$${total}` : ''}</h3>
                        </div>
                       
                        {  
                        !loadingUser&&currentUser&&
                            <Button
                                variant="success"
                                className={styles.checkout}
                                onClick={handleCheckOutButton}
                                disabled={districtSelected == 'Select District'}
                            >Checkout</Button>
                        }

                        {  
                        !loadingUser&&!currentUser&&
                            <Button
                                href="/login"
                                className={styles.checkout}
                                variant="success"
                            >Login/Signup</Button>
                        }
                    </div>

                </div>
            </Container>
        </FullHeightPage>
        </>
    )
}

export default ShoppingCart