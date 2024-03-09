const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
      authorization: '0cc93f9d-3b85-4d29-b804-092a45648896',
      'Content-Type': 'application/json'
    }
  }

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const request = (url, options) => {
    return fetch(url, options).then(getResponse);
}

export const getUserInfo = () => {
    return request(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
}

export const updateUserInfo = (name, about) => {
    return request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
}
  
export const getInitialCards = () => {
    return request(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
}

export const getInitialData = () => {
    return Promise.all([getUserInfo(), getInitialCards()]);
}

export const addCard = (name, link) => {
    return request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
}

export const deleteCard = (id) => {
    return request(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

export const setLike = (id) => {
    return request(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
}

export const deleteLike = (id) => {
    return request(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

export const updateAvatar = (link) => {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
}
