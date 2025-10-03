class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // other methods for working with the API
  userInfo(picture, name, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((user) => {
        picture.src = user.avatar;
        name.textContent = user.name;
        description.textContent = user.about;
      })
      .catch((error) => console.log(error));
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  loadCards(getCardElement) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((card) => {
        card.reverse();
        card.forEach(function (element) {
          getCardElement(element);
        });
      })
      .catch((error) => console.log(error));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then((res) => res.json)
      .catch((error) => console.log(error));
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).catch((error) => console.log(error));
  }

  likeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }
  unlikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  loadLikes(cardID, likeBtn) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((card) => {
        card.forEach((element) => {
          if (element.isLiked && element._id == cardID) {
            likeBtn.classList.add("card__like-btn-liked");
          }
        });
      });
  }
}

export default Api;
