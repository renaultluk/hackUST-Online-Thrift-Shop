import create from 'zustand'
import { persist } from 'zustand/middleware' 

const useShoppingStore = create(
    // persist(
    (set, get) => ({
        shoppingCart: [],
        addToShoppingCart: (item) => {
            set(state => ({
                shoppingCart: [...state.shoppingCart, item]
            }))
        },
        removeFromShoppingCart: (item) => {
            set(state => ({
                shoppingCart: state.shoppingCart.filter(i => i !== item)
            }))
        },
        clearShoppingCart: () => {
            set(state => ({
                shoppingCart: []
            }))
        }
    }), {
        name: 'shoppingCart'
    }
)
// )

export default useShoppingStore