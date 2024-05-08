import { useEffect, useState } from 'react';
import { getData, postData } from '../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Order } from '../utility/types';

export default function Success() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>('');
  const [orderIdx, setOrderIdx] = useState<string>('');
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  const paymentKey = params.get('paymentKey');
  const amount = params.get('amount');

  useEffect(() => {
    const fetchData = async () => {
      const memberIdx = localStorage.getItem('idx');
      const result = await getData(
        `/payments/toss/success?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
      );
      if (result && result.status === 'DONE') {
        setStatus(result.status);
        if (amount !== null && orderId !== null) {
          const orderData = await postData<Order>(
            `/orders/toss/success/order`,
            {
              menuCount: 1,
              totalPrice: Number(amount),
              status: 'DONE',
              memberIdx: Number(memberIdx),
              purchaseIdx: orderId,
            },
          );
          if (orderData && orderData.status === 200) {
            setOrderIdx(orderData.orderIdx);
          }
        }
      }
    };
    fetchData();
  }, [orderId, paymentKey, amount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);

    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <div
      className='flex flex-col justify-center items-center'
      style={{ height: '1000px' }}
    >
      <img src='https://www.mcdonalds.co.kr/kor/images/common/logo.png' />
      {status !== '' && orderIdx !== '' && (
        <>
          <div>고객님의 주문번호는 {orderIdx}번입니다.</div>
          <div>감사합니다.</div>
        </>
      )}
    </div>
  );
}
