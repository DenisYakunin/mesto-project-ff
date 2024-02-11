const cardTemplate = document.querySelector('#card-template').content;

export const createCard = function (cardData, deleteCard, likeCard, openPopupImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);

    cardElement.querySelector('.card__image').addEventListener('click', () => openPopupImage(cardData.name, cardData.link));

    return cardElement;
}

export const buildCardData = function (name, link) {
    const cardData = {
        name: name,
        link: link,
    };

    return cardData;
}

export const likeCard = evt => evt.target.classList.toggle('card__like-button_is-active');

export const deleteCard = evt => evt.target.closest('.places__item').remove();