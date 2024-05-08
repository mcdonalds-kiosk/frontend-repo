import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../api/api';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePwChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const login = async () => {
    const result = await getData(`/members/login?id=${id}&pw=${pw}`);
    if (result.status === true) {
      localStorage.setItem('idx', result.idx);
      localStorage.setItem('name', result.name);
      welcomePage();
    }
  };

  const welcomePage = () => {
    alert('어서오세요!');
    navigate('/order');
  };

  const joinPage = () => {
    navigate('/join');
  };

  const cancel = () => {
    setId('');
    setPw('');
  };

  return (
    <>
      <div
        className='bg-green-900 flex justify-center items-center'
        style={{ minHeight: '1000px' }}
      >
        <div className='flex flex-col justify-between'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
            }}
          >
            <img
              src='https://seeklogo.com/images/M/mcdonalds-green-logo-78D1E0747C-seeklogo.com.png'
              style={{ width: '70px', height: 'auto', marginRight: '20px' }}
            />
            <h1 className='text-white'>로그인 해주세요</h1>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label
              htmlFor='id'
              className='text-white'
              style={{ marginRight: '25px' }}
            >
              아이디
            </label>
            <input
              type='text'
              id='id'
              name='id'
              value={id}
              onChange={handleIdChange}
              required
              style={{ borderRadius: '5px', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label
              htmlFor='pw'
              className='text-white'
              style={{ marginRight: '10px' }}
            >
              비밀번호
            </label>
            <input
              type='password'
              id='pw'
              name='pw'
              value={pw}
              onChange={handlePwChange}
              required
              style={{ borderRadius: '5px', padding: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '30px' }}>
            <button
              type='button'
              className='py-2 px-6 bg-red-600 text-white font-semibold rounded-lg'
              onClick={cancel}
            >
              취소
            </button>
            <div style={{ width: '35px' }}></div> {/* 간격 */}
            <button
              type='button'
              className='py-2 px-12 bg-green-600 text-white font-semibold rounded-lg'
              onClick={login}
            >
              로그인
            </button>
          </div>
          <div style={{ marginBottom: '60px', display: 'flex' }}>
            <button
              type='button'
              style={{ marginLeft: '50px' }}
              className='py-2 px-10 bg-green-600 text-white font-semibold rounded-lg'
              onClick={welcomePage}
            >
              비회원 입장
            </button>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <button
              type='button'
              style={{ marginLeft: '58px' }}
              className='py-2 px-10 bg-red-600 text-white font-semibold rounded-lg'
              onClick={joinPage}
            >
              회원 가입
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
