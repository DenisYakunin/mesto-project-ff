const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardElement;
}

const deleteCard = evt => evt.target.closest('.places__item').remove();

const placesList = document.querySelector('.places__list');

initialCards.forEach(function(item) {
    cardElement = createCard(item, deleteCard)
    placesList.append(cardElement);
});
