import { Container, Button } from "react-bootstrap";

import FullHeightPage from "../components/FullHeightPage";

const ShoppingCart = () => {
    const [total, setTotal] = useState(0);

    return (
        <FullHeightPage>
            <Container>
                <h1>Shopping Cart</h1>
                <Container>
                </Container>
            </Container>
        </FullHeightPage>
    )
}

export default ShoppingCart