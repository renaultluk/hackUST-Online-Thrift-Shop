import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

import styles from "../styles/header.module.css";

const Header = () => {
    return (
        <Navbar className={styles.navbar}>
            <Container className={styles.navbarContainer}>
                <Navbar.Brand href="/">
                    Brand
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/men">Men</Nav.Link>
                        <Nav.Link href="/women">Women</Nav.Link>
                        <Nav.Link href="/kids">Kids</Nav.Link>
                        <Nav.Link href="/accessories">Accessories</Nav.Link>
                        <Nav.Link>
                            <AiOutlineShoppingCart />
                        </Nav.Link>
                        <Button>
                            Login
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;