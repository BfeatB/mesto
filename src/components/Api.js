class Api {
    constructor(options) {
      this._options = options;
    }

    _fetch(personalMethod, options) {
        return fetch(this._options.baseUrl + personalMethod, {
            headers: this._options.headers,
            ...options
        }) 
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
    }

    getUserInfo() {
        return this._fetch('/users/me');
    }
  
    getInitialCards() {
      // ...
    }
  
    // другие методы работы с API
  }
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
    headers: {
      authorization: 'b1cd0dc5-2b23-4623-93d8-d89ffc3baa40',
      'Content-Type': 'application/json'
    }
  }); 

  export default api;