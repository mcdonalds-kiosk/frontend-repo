import { useContext, useEffect, useState } from 'react';
import { getData } from '../api/api';
import { Cart, MenuItem } from '../utility/types';
import { CartContext } from '../context/CartContext';
import { category } from '../utility/category';

export default function Menu() {
  const [menuAll, setMenuAll] = useState<MenuItem[] | undefined>();
  const [selectIdx, setSelectIdx] = useState<number>(1);
  const [selectMenuName, setSelectMenuName] = useState<string>('버거&세트');
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('/menu');
      setMenuAll(result);
    };
    fetchData();
  }, []);

  const clickCategory = (idx: number) => {
    const selectMenu = category?.find((c) => c.idx === idx);
    setSelectIdx(idx);
    selectMenu && setSelectMenuName(selectMenu.name);
  };

  const clickMenu = (idx: number) => {
    const selectMenu = menuAll?.find((menu) => menu.idx === idx);
    if (selectMenu) {
      const existingItemIndex = cart.findIndex(
        (m) => m.name === selectMenu?.name,
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].count += 1;
        updatedCart[existingItemIndex].price += selectMenu.price;
        setCart(updatedCart);
      } else {
        const cartMenu: Cart = {
          name: selectMenu.name,
          price: selectMenu.price,
          count: 1,
        };
        setCart((prevCart) => [...prevCart, cartMenu]);
      }
    }
  };

  return (
    <>
      <div className='flex flex-row m-4'>
        <div>
          <img
            src='https://www.mcdonalds.co.kr/kor/images/common/logo.png'
            className='w-12 mx-6'
          />
          <div className='flex flex-col justify-center mr-2 mt-4'>
            {category.map((item) => (
              <button
                key={item.idx}
                className='border border-2 rounded-md w-25 mb-3 w-24 p-1 text-center'
                onClick={() => clickCategory(item.idx)}
              >
                <div className='flex justify-center'>
                  <img src={`${item.img_url}`} className='w-20' />
                </div>
                <p className='text-sm'>{`${item.name}`}</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold mt-3 mb-4'>{selectMenuName}</h1>
          <div className='grid grid-cols-3'>
            {menuAll &&
              menuAll.map(
                (m) =>
                  m.categoryIdx === selectIdx && (
                    <button
                      key={m.idx}
                      className='w-36 m-2'
                      onClick={() => clickMenu(m.idx)}
                    >
                      <img src={m.imageUrl} className='rounded-lg'></img>
                      <div className='flex justify-start text-sm font-bold'>
                        {m.name}
                      </div>
                      <div className='flex justify-end text-sm'>{m.price}</div>
                    </button>
                  ),
              )}
          </div>
        </div>
      </div>
    </>
  );
}
