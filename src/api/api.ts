const BASE_URL = 'http://localhost:8080/api/v1';

export const getData = async (url: string) => {
  return await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => response.json());
};

export const postData = async <T>(url: string, body: T): Promise<any> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('네트워크 요청이 실패했습니다.');
  }
  return await response.json();
};
