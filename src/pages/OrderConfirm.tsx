import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Cart } from '../utility/types';
import { postData } from '../api/api';
import { loadTossPayments } from '@tosspayments/payment-sdk';

export default function OrderConfirm() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [menuName, setMenuName] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCount, setToalCount] = useState<number>(0);
  const clientKey = import.meta.env.VITE_APP_CLIENT_KEY;

  useEffect(() => {
    let price = 0;
    let cnt = 0;
    cart.map((item: Cart) => {
      cnt += item.count;
      price += item.price;
    });
    setToalCount(cnt);
    setTotalPrice(price);
    if (cnt <= 1) setMenuName(`${cart[0].name}`);
    else setMenuName(`${cart[0].name}외 ${cnt - 1}개`);
  }, [cart]);

  const goToBack = () => {
    navigate(-1);
  };

  const payment = async () => {
    const memberIdx = localStorage.getItem('idx');

    const requestPayments = await postData('/payments/toss', {
      memberIdx: memberIdx,
      payType: 'card',
      amount: totalPrice,
    });
    if (
      requestPayments.orderId !== null &&
      clientKey !== null &&
      memberIdx !== null
    ) {
      loadTossPayments(clientKey).then((tossPayments) => {
        tossPayments
          .requestPayment('카드', {
            amount: totalPrice,
            orderName: menuName,
            orderId: requestPayments.orderId,
            customerName: memberIdx,
            successUrl: 'http://localhost:3000/success',
            failUrl: 'http://localhost:3000/fail',
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
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
          <button className='btn-primary w-full' onClick={payment}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
