import { useEffect, useState } from 'react'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import QRCode from 'react-qr-code'

import ShippingLabel from '../../components/ShippingLabel'

import FullHeightPage from '../../components/FullHeightPage'
import styles from '../../styles/successful.module.css'

const DonationConfirm = () => {
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [])

    const handleDownload =  async () => {
      const doc = <ShippingLabel />;
      const asPdf = pdf([]); // {} is important, throws without an argument
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      saveAs(blob, 'thriftee-label.pdf');
    }
    
    return (
        <>
            <Head>
                <title>Thriftee | Donation Confirmation</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/thriftee_logo.ico" />
            </Head>
            <FullHeightPage>
                <Container className={styles.pageContainer}>
                    <h1 className={styles.check}>
                        <AiFillCheckCircle />
                    </h1>
                    <h2>Your donation was successful!</h2>
                    {isClient && (
                        // <Button onClick={handleDownload}>
                        //     Download Shipping Label
                        // </Button>
                        <PDFDownloadLink document={<ShippingLabel />} fileName="thriftee-label.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Shipping Label')}
                        </PDFDownloadLink>
                    )}

                    <h3>What's next?</h3>

                    <ol>
                        <li><span>Download and print the shipping label</span></li>
                        <li><span>Put your clothes in one container/bag and 
                            attach the shipping label on top</span></li>
                        <li><span>Bring your clothes to the nearest 7-Eleven and the staff will handle the rest!</span></li>
                        <li><span>Keep the receipt for easier reference.</span></li>
                    </ol>

                    {/* {isClient && (
                        <PDFViewer>
                            <ShippingLabel />
                        </PDFViewer>
                    )} */}

                    <Button
                        className={styles.backHomeButton}
                        variant="primary"
                        href="/"
                        onClick={() => {
                            router.push({
                                pathname: "/"
                            });
                        }}
                    >
                        Go to home page
                    </Button>
                </Container>
            </FullHeightPage>
        </>
    )
}

export default DonationConfirm;