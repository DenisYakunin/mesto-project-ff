const cardTemplate = document.querySelector('#card-template').content;

export const createCard = function (cardData, onDeleteCard, onLikeCard, openPopupImage, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__like-counter').textContent = cardData.likes.length;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    deleteButton.addEventListener('click', () => {
        onDeleteCard(cardElement, cardData._id);
    });

    if (userId !== cardData.owner._id) {
        deleteButton.classList.add('card__delete-button_inactive');
    }

    const likeButton = cardElement.querySelector('.card__like-button');

    if (cardData.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', (evt) => {
        onLikeCard(evt, cardData._id);
    });

    cardImage.addEventListener('click', () => openPopupImage(cardData.name, cardData.link));

    return cardElement;
}

export function likeCard(event, likeCount) {
    event.target.classList.toggle('card__like-button_is-active')
    const likesCounter = event.target.nextElementSibling; 
    likesCounter.textContent = likeCount; 
}

export const removeCard = (cardElement) => {
    cardElement.remove();
}
