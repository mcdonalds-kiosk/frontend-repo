import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Cart } from '../utility/types';

export default function OrderConfirm() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState<number | undefined>();
  const [totalCount, setToalCount] = useState<number | undefined>();

  useEffect(() => {
    let price = 0;
    let cnt = 0;
    cart.map((item: Cart) => {
      cnt += item.count;
      price += item.price;
    });
    setToalCount(cnt);
    setTotalPrice(price);
  }, [cart]);

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <div
      className='bg-green-800 flex flex-col justify-center items-center'
      style={{ height: '1000px' }}
    >
      <h1 className='font-medium text-2xl mb-6 text-white'>
        주문을 확인하세요
      </h1>
      <div className='bg-white p-12 rounded-md'>
        {cart.map((item) => (
          <div key={item.name} className='m-2 text-center'>
            <div>
              {item.name} - {item.price}원 - {item.count}개
            </div>
          </div>
        ))}
        <div className='flex flex-row justify-center mt-10 font-bold text-lg'>
          <div className='mr-4'>총 수량: {totalCount}개 </div>
          <div className='text-red-600'>총 가격: {totalPrice}원</div>
        </div>
        <div className='flex flex-row gap-3 mt-10'>
          <button className='btn-danger w-full' onClick={goToBack}>
            추가주문
          </button>
          <button className='btn-primary w-full'>결제하기</button>
        </div>
      </div>
    </div>
  );
}
