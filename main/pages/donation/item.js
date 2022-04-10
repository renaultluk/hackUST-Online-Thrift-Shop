import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";

import useDonationStore from "../../utils/DonationStore";

import FullHeightPage from "../../components/FullHeightPage";

const DonateItemDetails = () => {
    const donationStore = useDonationStore();
    const router = useRouter();
    const queryParams = router.query;
    const itemID = queryParams.itemID;

    const [item, setItem] = useState(
        itemID ?
            donationStore.itemsDonated[itemID] :
            {
                name: "",
                weight: 0,
                image: ""
            }
    );

    const handleUpload = () => {
        // if (itemID) {
        //     donationStore.updateItemInDonation(item, itemID);
        // } else {
        //     donationStore.addToDonation(item);
        // }
        router.back();
    }

    return (
        <FullHeightPage>
            <Container>
                <h1>Item Details</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={item.name}
                            onChange={(e) => setItem({ ...item, name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter weight"
                            value={item.weight}
                            onChange={(e) => setItem({ ...item, weight: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        {item.image.length > 0 ?
                            <Row>
                                <Image
                                    src={item.image}
                                    width={100}
                                    height={100}
                                    className="mt-2"
                                />
                            </Row> :
                            <></>
                        }
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Upload image"
                            onChange={(e) => {
                                setItem({ ...item, image: e.target.files[0] })
                            }}
                        />
                    </Form.Group>

                    <Button onClick={handleUpload}>
                        Upload
                    </Button>
                </Form>
            </Container>
        </FullHeightPage>
    )
}

export default DonateItemDetails;