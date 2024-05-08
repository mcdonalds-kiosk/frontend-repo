import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCount, setToalCount] = useState<number>(0);
  const { cart, setCart } = useContext(CartContext);
  const deleteAll = () => {
    setCart([]);
  };
  const setCount = (name: string, sign: string) => {
    const selectMenu = cart.find((m) => m.name === name);
    const cartIndex = cart.findIndex((m) => m.name === name);
    const updatedCart = [...cart];

    if (selectMenu) {
      if (sign === '+') {
        updatedCart[cartIndex].count += 1;
        updatedCart[cartIndex].price += selectMenu.price;
      } else {
        if (selectMenu.count === 1) {
          const updatedCart = cart.filter((m) => m.name !== name);
          setCart(updatedCart);
          return;
        }
        updatedCart[cartIndex].count -= 1;
        updatedCart[cartIndex].price -= selectMenu.price;
      }
    }
    setCart(updatedCart);
  };

  useEffect(() => {
    let price = 0;
    let cnt = 0;
    cart.map((item) => {
      cnt += item.count;
      price += item.price;
    });
    setToalCount(cnt);
    setTotalPrice(price);
  }, [cart]);

  const goToConfirm = () => {
    console.log('클릭');
    navigate('/orderConfirm');
  };

  return (
    <>
      <div className='bg-green-800 flex flex-row justify-between p-2 text-white'>
        <div className='font-bold'>주문내역</div>
        <div>
          총 가격: {totalPrice}원 수량: {totalCount}
        </div>
      </div>
      <div className='h-36 p-2 overflow-y-auto'>
        {cart &&
          cart.map((item) => (
            <div key={item.name} className='flex flex-row mb-1'>
              <div className='w-7/12'>{item.name}</div>
              <button
                className='bg-amber-300 rounded-lg px-4'
                onClick={() => setCount(item.name, '-')}
              >
                -
              </button>
              <div className='w-1/12 text-center'>{item.count}</div>
              <button
                className='bg-amber-300 rounded-lg px-4'
                onClick={() => setCount(item.name, '+')}
              >
                +
              </button>
              <div className='w-2/6 text-end pr-10'>{item.price}</div>
            </div>
          ))}
      </div>
      <button className='btn-default' onClick={deleteAll}>
        비우기
      </button>
      <div className='flex flex-row gap-3'>
        <button className='btn-danger w-full'>주문 취소</button>
        <button className='btn-primary w-full' onClick={goToConfirm}>
          주문 완료
        </button>
      </div>
    </>
  );
}
