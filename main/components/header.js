import { Navbar, Nav, Container, Button, ButtonGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import { useAuth } from "../utils/AuthContext";

import { FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";

// import useForceUpdate from "../utils/useForceUpdate";
import styles from "../styles/header.module.css";

const Header = () => {
    const router = useRouter();
    const { loadingUser, currentUser, logout } = useAuth();

    return (
        <Navbar
            className={styles.navbar}
            collapseOnSelect={true}
            expand="lg"
            bg="secondary"
            variant="dark"
            sticky="top"
        >
            <Container className={styles.navbarContainer}>
                <Navbar.Brand href="/">
                    <img src='/logo.png' className={styles.logo}/>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>

                    <Nav className="me-auto">
                        <Nav.Link href="/market?category=women" className={styles.navbarItems}>
                            Women
                        </Nav.Link>
                        <Nav.Link href="/market?category=men" className={styles.navbarItems}>
                            Men
                        </Nav.Link>
                        <Nav.Link href = "/market?category=kids" className={styles.navbarItems}>
                            Kids
                        </Nav.Link>
                        <Nav.Link href="/donation" className={styles.navbarItems}>Donation</Nav.Link>
                        <Nav.Link href="/contact" className={styles.navbarItems}>Contact Us</Nav.Link>
                    </Nav>

                    <Nav>
                        <ButtonGroup className={styles.buttonGroup}>
                            <Button className={styles.navbarButtons}
                                variant="secondary"
                                href="/profile"
                            >
                                <FaUser />
                            </Button>
                            


                            <Button className={styles.navbarButtons}
                                variant="secondary"
                            >
                                <FaHeart />
                            </Button>
                            

                            <Button className={styles.navbarButtons}
                                variant="secondary"
                                onClick={() => {
                                    router.push({
                                        pathname: "/shopping-cart"
                                    });
                                }}
                            >
                            <FaShoppingBag />
                            </Button>

                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;