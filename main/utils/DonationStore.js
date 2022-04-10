import create from 'zustand'
import { persist } from 'zustand/middleware' 

const useDonationStore = create(
    // persist(
    (set, get) => ({
        itemsDonated: [
            {
                name: 'T-shirt',
                weight: 1.7,
                image: "https://cdn-images.farfetch-contents.com/17/68/34/51/17683451_37032163_1000.jpg"
            }
        ],
        pastDonations: [
            {
                donationId: '1',
                donationDate: '2020-01-01',
                userId: '1',
                itemsDonated: [
                    {
                        name: 'T-shirt',
                        weight: 1.7,
                        image: "https://cdn-images.farfetch-contents.com/17/68/34/51/17683451_37032163_1000.jpg"
                    }
                ],
                totalWeight: 1.7,
                estimatedRewards: {
                    fullVouchers: 0,
                    partialVoucher: 12
                }
            }
        ],
        addToDonation: (item) => {
            set(state => ({
                itemsDonated: [...state.itemsDonated, item]
            }))
        },
        removeFromDonation: (item) => {
            set(state => ({
                itemsDonated: state.itemsDonated.filter(i => i !== item)
            }))
        },
        updateItemInDonation: (item, index) => {
            set(state => ({
                itemsDonated: state.itemsDonated.map((i, idx) => idx === index ? item : i)
            }))
        },
        clearDonation: () => {
            set(state => ({
                itemsDonated: []
            }))
        },
        appendToPastDonations: (donation) => {
            set(state => ({
                pastDonations: [...state.pastDonations, donation]
            }))
        }
    }), {
        name: 'Donations'
    }
)
// )

export default useDonationStore