import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const popupShowImage = document.querySelector('.popup_type_image');
const cardImage = document.querySelector('.popup__image');
const cardName = document.querySelector('.popup__caption');

export const createCard = function (cardData, deleteCard, likeCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElement.querySelector('.card__image').addEventListener('click', () => {
        openModal(popupShowImage);
        cardImage.setAttribute('src', cardData.link)
        cardImage.setAttribute('alt', cardData.link)
        cardName.textContent = cardData.name;
    });

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