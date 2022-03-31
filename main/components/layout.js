import Header from "./header"
import Container from "react-bootstrap/Container"

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout;