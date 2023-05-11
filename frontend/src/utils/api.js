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

    _updateHeaders() {
      return {...this.headers, 'Authorization': `Bearer ${localStorage.getItem("token")}`}
    }

    getInitialCards(){
      return fetch(`${this.url}cards`, {headers: this._updateHeaders()})
        .then(res => this._getResponseData(res))
    }

    getUserInfo(){
      return fetch(`${this.url}users/me`, {headers: this._updateHeaders()})
        .then(res => this._getResponseData(res))
    }

    setUserInfo(formValues) {
      return fetch(`${this.url}users/me`, {
        method: 'PATCH',
        headers: this._updateHeaders(),
        body: JSON.stringify({name: formValues.name, about: formValues.about})
      })
        .then(res => this._getResponseData(res))
    }

    setUserAvatar(formValue) {
      return fetch(`${this.url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._updateHeaders(),
        body: JSON.stringify({avatar: formValue.avatar})
      })
        .then(res => this._getResponseData(res))
    }

    setNewCard(formValues) {
      return fetch(`${this.url}cards`, {
        method: 'POST',
        headers: this._updateHeaders(),
        body: JSON.stringify({name: formValues.title, link: formValues.url})
      })
        .then(res => this._getResponseData(res))
    }

      setDeleteCard(cardID) {
        return fetch(`${this.url}cards/${cardID}`, {
          method: 'DELETE',
          headers: this._updateHeaders()
        })
          .then(res => this._getResponseData(res))
      }

    setLikeCard(cardID) {
        return fetch(`${this.url}cards/${cardID}/likes`, {
          method: 'PUT',
          headers: this._updateHeaders()
        })
          .then(res => this._getResponseData(res))
    }

    deleteLikeCard(cardID) {
      return fetch(`${this.url}cards/${cardID}/likes`, {
          method: 'DELETE',
          headers: this._updateHeaders()
        })
          .then(res => this._getResponseData(res))
    }
  }

    const api = new Api({
    baseUrl: 'https://api.polyntseva.mesto.nomoredomains.monster/',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;