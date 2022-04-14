import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Image } from '@react-pdf/renderer';
// import QRCode from "react-qr-code";
import useDonationStore from '../utils/DonationStore';
// import { useAuth } from '../utils/AuthContext';


// Create styles
const styles = StyleSheet.create({
  page: {
    size: "A4",
    orientation: "landscape",
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  header: {
    padding: 10,
    backgroundColor: 'rgba(101,193,140,255)',
    color: 'white',
  },
  mainContainer: {
    flexDirection: 'row',
  },
  box: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    width: '60%',
    height: '100%',
  },
  ulContainer: {
    paddingLeft: 15,
  },
  section: {
    margin: 5,
    padding: 10,
    flexGrow: 1,
  },
  qrCode: {
    margin: 12,
    width: 150,
    height: 150,
  }
});

// Create Document Component
const ShippingLabel = () => {
    const donationStore = useDonationStore();
    const pastDonations = donationStore.pastDonations;
    const currentDonation = pastDonations[pastDonations.length - 1];

    // const { loadingUser, currentUser } = useAuth();
    
    return (
        <Document>
            <Page size="A4" orientation='landscape' style={styles.page}>
                <View style={styles.header}>
                    <Text>Thriftee Donation</Text>
                </View>
                
                <View style={styles.mainContainer}>
                    <View style={styles.box}>
                        <View style={styles.section}>
                            <Text style={{ fontWeight: 700 }}>Details</Text>
                            <Text>Donation ID: {currentDonation.donationId}</Text>
                            <Text>User ID: {currentDonation.userId}</Text>
                            <Text>Items Donated: </Text>
                                  {currentDonation.itemsDonated.map((item, index) => (
                                      <Text key={index}>
                                          &ensp;• {item.name} - {item.weight}kg
                                      </Text>
                                  ))}
                            <Text>Total Weight: {currentDonation.totalWeight}kg</Text>
                            <Text style={{ wrap: true }}>Estimated Rewards: 
                                {currentDonation.estimatedRewards} Thriftee Dollars</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <Text>QR Code:</Text>
                        <Image 
                            src={` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentDonation.donationId}`}
                            style={styles.qrCode}
                        />
                    </View>
                </View>
            </Page>
        </Document>
    )
};

export default ShippingLabel;