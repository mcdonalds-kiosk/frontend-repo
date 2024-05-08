import { createContext } from 'react';
import { Cart } from '../utility/types';

interface CartContextType {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});
