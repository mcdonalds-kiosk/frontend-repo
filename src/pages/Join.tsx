import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, postData } from '../api/api';
import { JoinMember } from '../utility/types';

function Join() {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePwChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const join = async () => {
    try {
      const isIdDuplicate = await getData('/members/check_dup_id?id=' + id);
      if (isIdDuplicate.status === true) {
        await postData<JoinMember>('/members/join', {
          id: id,
          pw: pw,
          name: name,
          email: email,
          role: 'USER',
        });
        alert('환영합니다!');
        navigate('/login');
      } else {
        alert('이미 사용중인 아이디입니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    setId('');
    setPw('');
    setEmail('');
    setName('');
  };

  return (
    <>
      <div
        className='bg-green-900 flex justify-center items-center '
        style={{ minHeight: '1000px' }}
      >
        <div className='flex flex-col justify-between'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <img
              src='https://seeklogo.com/images/M/mcdonalds-green-logo-78D1E0747C-seeklogo.com.png'
              style={{ width: '70px', height: 'auto', marginRight: '20px' }}
            />
            <h1 className='text-white'>회원가입 해주세요</h1>
          </div>
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '30px' }}>
              <label className='text-white' style={{ marginRight: '25px' }}>
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
              <label className='text-white' style={{ marginRight: '10px' }}>
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
            <div style={{ marginBottom: '30px' }}>
              <label className='text-white' style={{ marginRight: '25px' }}>
                이메일
              </label>
              <input
                type='text'
                id='email'
                name='email'
                value={email}
                onChange={handleEmailChange}
                required
                style={{ borderRadius: '5px', padding: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label className='text-white' style={{ marginRight: '40px' }}>
                이름
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={handleNameChange}
                required
                style={{ borderRadius: '5px', padding: '5px' }}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <button
                type='button'
                className='py-2 px-6 bg-red-600 text-white font-semibold rounded-lg'
                onClick={cancel}
              >
                취소
              </button>
              <div style={{ width: '20px' }}></div>
              <button
                type='button'
                className='py-2 px-12 bg-green-600 text-white font-semibold rounded-lg'
                onClick={join}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Join;
