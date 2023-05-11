const BASE_URL = 'https://api.polyntseva.mesto.nomoredomains.monster'; //my adress
const HEADERS = {'Content-Type': 'application/json'};

function getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.json());
    }
    return res.json();
}
export function register(values) {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({password: values.password, email: values.email})
  })
  .then(res=> getResponseData(res))
}

export function login(values) {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({password: values.password, email: values.email})
  })
  .then(res=> getResponseData(res))
  .then(res=> {localStorage.setItem('token', res.token)})
}

export function checkToken(jwt) {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {...HEADERS, 'Authorization': `Bearer ${jwt}`}
  })
  .then(res=> getResponseData(res))
}