import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Join from './pages/Join';
import Order from './pages/Order';
import OrderConfirm from './pages/OrderConfirm';
import { CartContext } from './context/CartContext';
import { useState } from 'react';
import { Cart } from './utility/types';

function App() {
  const [cart, setCart] = useState<Cart[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/order' element={<Order />}></Route>
        <Route path='/orderConfirm' element={<OrderConfirm />}></Route>
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
