import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FullHeightPage from '../../components/FullHeightPage';
import { MdEdit } from 'react-icons/md';

import { firestore } from '../../utils/firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from "../../utils/AuthContext";

import useDonationStore from '../../utils/DonationStore';
import generateOrderID from '../../utils/utils';

import styles from '../../styles/donation.module.css';

const Donation = () => {
    const donationStore = useDonationStore();
    const { loadingUser, currentUser } = useAuth();
    const donationItems = donationStore.itemsDonated;
    const router = useRouter();

    const [totalWeight, setTotalWeight] = useState(0);

    const [rewards, setRewards] = useState(
        {
            fullVouchers: 0,
            partialVoucher: 12
        }
    );

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
    
    return (
        <FullHeightPage>
            <Container>
                <h1>Clothes Donation</h1>
                <Container>
                    {donationItems.map((item, index) => (
                        <Row key={index} className={styles.productRow}>
                            <Image
                                src={item.image}
                                width={100}
                                height={100}
                                className={styles.productImage}
                            />
                            <Col>
                                <h3>{item.name}</h3>
                            </Col>
                            <Col xs lg={2} className="d-flex justify-content-end align-items-center">
                                <span>Weight: {item.weight}kg</span>
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
                        <h3>Total Items: {donationItems.length}</h3>
                        <h4>
                            Estimated Rewards: &nbsp;
                            {rewards.fullVouchers}
                            &nbsp;Full Vouchers & 1 &nbsp;
                            {rewards.partialVoucher}
                            % Voucher
                        </h4>
                    </Col>
                    <Col xs lg={2}  className="d-flex justify-content-end">
                        <Button onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </Col>
                </Row>
            </Container>
        </FullHeightPage>
    )
}

export default Donation;