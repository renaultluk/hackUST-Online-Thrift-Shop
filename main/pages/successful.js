import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { AiFillCheckCircle } from 'react-icons/ai'

import FullHeightPage from '../components/FullHeightPage'
import styles from '../styles/successful.module.css'

const SuccessfulOrder = () => {
    return (
        <FullHeightPage>
            <Container className={styles.pageContainer}>
                <h1 className={styles.check}>
                    <AiFillCheckCircle />
                </h1>
                <span>Your order was successful.</span>
                <span>Please check your email for confirmation.</span>
                <Button
                    className={styles.backHomeButton}
                    variant="primary"
                    href="/"
                >
                    Go to home page
                </Button>
            </Container>
        </FullHeightPage>
    )
}

export default SuccessfulOrder