import {createContext , useContext, useState} from 'react'
import axiosInstance from '../api/axiosInstance';
import { useAuth } from './AuthContext';
const CartContext = createContext()

export const cartAuth = () => {
    return useContext(CartContext)
}

// NOTE: The CartProvider must now be passed a list of all products (with prices) 
// for the getTotalCartAmount function to work.
export const CartProvider = ({children, productsData = []}) => { 
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState({}) // Use object for cart state
    const {token} = useAuth()

    const url = "https://wbc-backend-13ki.onrender.com/api"

    const addCart  = async (productId) => {
        setCart((prev={})=>({
            ...prev,
            [productId]:(prev[productId] || 0)+1,
        }))

        if(token){ 
            try{
                await axiosInstance .post(`${url}/cart/add`, {
                    productId},{headers:`Bearer ${token}`
                })
            } catch(error){
                console.log(error);
            }
        }
    }

    const removeFromCart = async (productId) => {
        setCart((prev={})=>{
            const newCount=(prev[productId] || 0)-1;
            
            // Remove the key entirely if count drops to zero
            if (newCount <= 0) {
                const { [productId]: removed, ...rest } = prev;
                return rest;
            }
            
            return{
                ...prev,
                [productId]: newCount,
            }
        });

        if(token){
            try{
                await axiosInstance.delete(`${url}/cart/remove/${productId}`, {headers:`Bearer ${token}`
                })
            } catch(error){
                console.log(error);
            }
        }
    }

    // ⭐ COMPLETED FUNCTION ⭐
   // Inside CartProvider in CartContext.jsx
// Assume productsData is available as a prop passed to CartProvider: {children, productsData = []}
// Assume cart is the context state: const [cart, setCart] = useState({}) 

const getTotalCartAmount = () => {  
    let totalAmount = 0;
    
    // 1. Create a price lookup map from the available products data
    // Ensure productsData is an array to safely use .reduce
    const safeProducts = productsData || []; 
    const priceMap = safeProducts.reduce((map, product) => {
        map[product._id] = product.price;
        return map;
    }, {});
    
    // 2. Iterate over the context's 'cart' state (which is a map of {productId: quantity})
    for (const productId in cart) {
        const quantity = cart[productId];
        const price = priceMap[productId];

        // 3. Calculate total if quantity is valid and price data exists
        if (quantity > 0 && price) {
            totalAmount += price * quantity;
        }
    }

    // 4. Save the total to localStorage
    localStorage.setItem("totalAmount", totalAmount);
    
    // 5. Explicitly return the result
    return totalAmount; 
}
    
    return (
        <CartContext.Provider value={{
            loading,
            token,
            user,
            cart,
            addCart,
            removeFromCart,
            getTotalCartAmount, // Export the completed function
            setLoading,
            setUser,
            setCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;