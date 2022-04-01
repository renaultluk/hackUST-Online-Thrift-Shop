import { useState } from "react";
import { Container, Col, Button } from "react-bootstrap";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import Link from "next/link";

import FullHeightPage from "../../components/FullHeightPage";

const ProductBrief = (props) => {
    const { product } = props;
    return (
        <Link href={"/market/" + product.id}>
            <Col>
                <span>{product.name}</span>
                <span>{product.price}</span>
            </Col>
        </Link>
    );
}


const Market = () => {
    const [items, setItems] = useState([{
        id: 1,
        name: "Product 1",
        price: "100",
    }]);
    
    return (
        <FullHeightPage>
            <Container>
                {items.map(item => (
                    <ProductBrief key={item.id} product={item} />
                ))}
            </Container>
        </FullHeightPage>
    )
}

export default Market;