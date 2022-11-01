export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  _handleServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`)
   .catch((error) => {
    console.log(error);
  });
  };

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleServerResponse)

  };

  sendUserInformation(newName, newJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    })
      .then(this._handleServerResponse)

  };


  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._handleServerResponse)

  };




  // другие методы работы с API
}


