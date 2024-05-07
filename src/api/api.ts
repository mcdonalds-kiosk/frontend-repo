const BASE_URL = 'http://localhost:8080/api/v1';

export const getData = async (url: string) => {
  return await fetch(`${BASE_URL}${url}`).then((response) => response.json());
};

export const postData = async <T>(url: string, body: T) => {
  return await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((response) => response.json());
};
