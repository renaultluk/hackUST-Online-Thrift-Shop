import { Navbar, Nav, Container, Button, ButtonGroup } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";

import styles from "../styles/header.module.css";

const Header = () => {
    const router = useRouter();
    
    return (
        <Navbar
            className={styles.navbar}
            collapseOnSelect
            expand="lg"
            bg="secondary"
            variant="dark"
            sticky="top"
        >
            <Container className={styles.navbarContainer}>
                <Navbar.Brand href="/">
                    Brand
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav.Link
                        onClick={() => {
                            router.push({
                                pathname: "/market",
                                query: {
                                    category: "women"
                                }
                            })
                        }}
                    >
                        Women
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            router.push({
                                pathname: "/market",
                                query: {
                                    category: "men"
                                }
                            })
                        }}
                    >
                        Men
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            router.push({
                                pathname: "/market",
                                query: {
                                    category: "kids"
                                }
                            })
                        }}
                    >
                        Kids
                    </Nav.Link>
                    <Nav.Link href="/donation">Donation</Nav.Link>
                    <Nav.Link href="/contact">Contact Us</Nav.Link>
                    <ButtonGroup className={styles.buttonGroup}>
                        <Button variant="secondary">
                            <FaUser />
                        </Button>
                        <Button variant="secondary">
                            <FaHeart />
                        </Button>
                        <Button variant="secondary">
                            <FaShoppingBag />
                        </Button>
                    </ButtonGroup>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;