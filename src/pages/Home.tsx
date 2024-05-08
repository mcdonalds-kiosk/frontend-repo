import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div onClick={() => navigate('/login')}>
      <div
        className='bg-red-600 flex flex-col justify-center items-center'
        style={{ height: '800px' }}
      >
        <img src='https://i.namu.wiki/i/oi9sBDTuutRiAra4ITI7MDfyMmlmxY9Hj6fKsrjksNXdnsqxUuzsuq5C5eyEakUt_lgDJH-4k51fdUop_GL5cEupszNAF9R63BFLC1eCNVwCqVMLtKovMFLBv50sq8CMrEitU_TKbDBny9ti5cmvIw.svg' />
      </div>
      <div
        className='bg-green-800 flex flex-row justify-center items-center'
        style={{ height: '200px' }}
      >
        <div className='text-white text-2xl'>주문하시려면 클릭하세요</div>
      </div>
    </div>
  );
}
