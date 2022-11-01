export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
      })
       .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      });

}

  // другие методы работы с API
}


