import Cart from '../components/Cart';
import Menu from '../components/Menu';

function Order() {
  return (
    <>
      <img src='https://www.mcdonalds.co.kr/upload/main/banner/1714446264429.jpg'></img>
      <button className='btn-primary mx-3 my-3 float-end'>이전</button>
      <Menu />
      <Cart />
    </>
  );
}

export default Order;
