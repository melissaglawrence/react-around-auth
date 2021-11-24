class Api {
  constructor(baseUrl, authToken) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  userAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: avatar }),
    }).then(this._handleResponse);
  }

  createNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
    }).then(this._handleResponse);
  }
}
const api = new Api(
  'https://around.nomoreparties.co/v1/group-10',
  '76dcd78a-c08a-4542-9970-ac94148167e2',
);

export default api;
