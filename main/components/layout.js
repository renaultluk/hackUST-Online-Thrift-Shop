import Header from "./header"
import Container from "react-bootstrap/Container"
import { withRouter } from "next/router";

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

export default withRouter(Layout);