import { Route, Routes } from 'react-router-dom';
import Order from './pages/Order';
import { CartContext } from './context/CartContext';
import { useState } from 'react';
import { Cart } from './utility/types';
import OrderConfirm from './pages/OrderConfirm';

function App() {
  const [cart, setCart] = useState<Cart[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Routes>
        <Route path='/order' element={<Order />}></Route>
        <Route path='/orderConfirm' element={<OrderConfirm />}></Route>
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
