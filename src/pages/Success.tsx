import { useEffect, useState } from 'react';
import { getData } from '../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
      const result = await getData(
        `/payments/toss/success?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
      );
      if (result && result.status === 'DONE') {
        setStatus(result.status);
        setOrderIdx(result.orderId);
      }
    };
    fetchData();
  }, [orderId, paymentKey, amount, navigate]);
  return (
    <div
      className='flex flex-col justify-center items-center'
      style={{ height: '1000px' }}
    >
      <img src='https://www.mcdonalds.co.kr/kor/images/common/logo.png' />
      {status !== '' && (
        <>
          <div>고객님의 주문번호는 {orderIdx}입니다.</div>
          <div>감사합니다.</div>
        </>
      )}
    </div>
  );
}
