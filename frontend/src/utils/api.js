class Api {
    constructor(options) {
      this.url = options.baseUrl;
      this.headers = options.headers;
    }
  
    _getResponseData(res) {
      if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }
  
    getInitialCards(){
      return fetch(`${this.url}cards`, {headers: this.headers})
        .then(res => this._getResponseData(res))
    }
  
    getUserInfo(){
      return fetch(`${this.url}users/me`, {headers: this.headers})
        .then(res => this._getResponseData(res))
    }
  
    setUserInfo(formValues) {
      return fetch(`${this.url}users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({name: formValues.name, about: formValues.about})
      })
        .then(res => this._getResponseData(res))
    }
  
    setUserAvatar(formValue) {
      return fetch(`${this.url}users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({avatar: formValue.avatar})
      })
        .then(res => this._getResponseData(res))
    }
  
    setNewCard(formValues) {
      return fetch(`${this.url}cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({name: formValues.title, link: formValues.url})
      })
        .then(res => this._getResponseData(res))
    }
  
      setDeleteCard(cardID) {
        return fetch(`${this.url}cards/${cardID}`, {
          method: 'DELETE',
          headers: this.headers
        })
          .then(res => this._getResponseData(res))
      }
  
    setLikeCard(cardID) {
        return fetch(`${this.url}cards/${cardID}/likes`, {
          method: 'PUT',
          headers: this.headers
        })
          .then(res => this._getResponseData(res))
    }
  
    deleteLikeCard(cardID) {
      return fetch(`${this.url}cards/${cardID}/likes`, {
          method: 'DELETE',
          headers: this.headers
        })
          .then(res => this._getResponseData(res))
    }
  }
  
    const api = new Api({
    baseUrl: 'http://polyntseva.mesto.nomoredomains.monster/api/',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;