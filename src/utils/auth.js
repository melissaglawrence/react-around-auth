const BASE_URL = 'https://register.nomoreparties.co.';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
};

const signUp = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

const signIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
};

const getUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',

      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem('user', data.data.email);
      return data;
    });
};

export { signIn, signUp, getUser };
