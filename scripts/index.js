function createCard(title, imagePath, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = imagePath;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardElement;
}

deleteCard = evt => evt.target.closest('.places__item').remove();

const placesList = document.querySelector('.places__list');

initialCards.forEach(function(item) {
    cardElement = createCard(item.name, item.link, deleteCard)
    placesList.append(cardElement);
});
