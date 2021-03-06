import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FullHeightPage from '../../components/FullHeightPage';
import { MdEdit } from 'react-icons/md';

import { firestore } from '../../utils/firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from "../../utils/AuthContext";

import useDonationStore from '../../utils/DonationStore';
import generateOrderID from '../../utils/utils';
import { donationRewards } from '../../utils/CalculationUtils';

import styles from '../../styles/donation.module.css';

const Donation = () => {
    const donationStore = useDonationStore();
    const { loadingUser, currentUser } = useAuth();
    const donationItems = donationStore.itemsDonated;
    const router = useRouter();

    // const [rewards, setRewards] = useState(
    //     {
    //         fullVouchers: 0,
    //         partialVoucher: 12
    //     }
    // );

    useEffect(() => {
        if (!loadingUser && !currentUser){
            router.push('/login')        
        }
      }, [currentUser])

    const handleConfirm = () => {
        const donationId = generateOrderID();
        const donation = {
            donationId: donationId,
            donationDate: Timestamp.now(),
            userId: currentUser.uid,
            itemsDonated: donationItems,
            totalWeight: totalWeight,
            estimatedRewards: rewards
        }

        const donateRef = doc(firestore, 'donations', donationId);
        setDoc(donateRef, donation, { merge: true });

        donationStore.appendToPastDonations(donation);
        donationStore.clearDonation();
        router.push({
            pathname: '/donation/confirm',
            query: {
                donationId: donationId,
            }
        });
    }

    let totalWeight = donationItems.reduce((acc, curr) => acc + Number(curr.weight), 0);
    let rewards = donationRewards(totalWeight);
    
    return (
        <>
            <Head>
                <title>Thriftee | Donation</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/thriftee_logo.ico" />
            </Head>
            <FullHeightPage>
                <Container>
                    <h1 className={styles.titleHeader}>Clothes Donation</h1>
                    <Container>
                        {donationItems.map((item, index) => (
                            <Row key={index} className={styles.productRow}>
                                <img
                                    src={item.image}
                                    width={100}
                                    height={100}
                                    className={styles.productImage}
                                />
                                <Col>
                                    <h3 className={styles.productName}>{item.name}</h3>
                                </Col>
                                <Col xs lg={2} className="d-flex justify-content-end align-items-center">
                                    <span className={styles.pricetag}>Weight: {item.weight}kg</span>
                                    <Button
                                        variant="link"
                                        
                                        onClick={() => {
                                            router.push({
                                                pathname: '/donation/item',
                                                query: {
                                                    itemID: index
                                                }
                                            })
                                        }}
                                    >
                                        <MdEdit />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className={styles.removeButton}
                                        onClick={() => {
                                                donationStore.removeFromDonation(item)    
                                            }
                                        }
                                    >
                                        -
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                        <Button onClick={() => {
                            router.push('/donation/item');
                        }}>
                            Add Donation Item
                        </Button>
                    </Container>
                    <Row className="mt-2">
                        <Col>
                            <h3  className={styles.priceTotal}>Total Items: {donationItems.length}</h3>
                            <h4  className={styles.priceTotal}>Total Weight: {totalWeight}kg</h4>
                            <h4  className={styles.priceTotal}>
                                Estimated Rewards: &nbsp;
                                {/* {rewards.numberOfFullVouchers}
                                &nbsp;Full Vouchers & 1 &nbsp;
                                {rewards.partialVoucherValue}
                                % Voucher */}
                                {rewards} Thriftee Dollars
                            </h4>
                        </Col>
                        <Col xs lg={2}  className="d-flex justify-content-end">
                            <Button onClick={handleConfirm} className={styles.checkout}>
                                Confirm
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </FullHeightPage>
        </>
    )
}

export default Donation;