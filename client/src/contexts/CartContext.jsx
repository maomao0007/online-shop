import { createContext, useState, useEffect} from "react";
import { getCart } from "../services/cartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

   const fetchCart = async () => {
     try {
       const res = await getCart();
       setCart(res.data.data);
     } catch (error) {
       console.error("Cart fetch failed:", error);
     }
   };

   useEffect(() => {
     fetchCart();
   }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}


