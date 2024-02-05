import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, buildCardData, showImage, likeCard, deleteCard } from './card.js'
import { openModal, closeModal, closeWithX } from './modal.js'

document.addEventListener("click", (evt) => {
    closeWithX(evt);
});

// Инициализация карточек 

const placesList = document.querySelector('.places__list');

initialCards.forEach(function(item) {
    let cardElement = createCard(item, deleteCard, likeCard, showImage)
    placesList.append(cardElement);
});

// Обработка при редактировании профиля

const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms[0];
const profileNameInput = formEditProfile.elements.name;
const profileDescriptionInput = formEditProfile.elements.description;

function fillProfile () {
    profileNameInput.value = document.querySelector('.profile__title').textContent;
    profileDescriptionInput.value = document.querySelector('.profile__description').textContent;
}

fillProfile();

popupEditButton.addEventListener('click', () => {
    fillProfile();
    openModal(popupEditProfile);
});

function handleFormEditSubmit(evt) {
    evt.preventDefault(); 
    
    document.querySelector('.profile__title').textContent = profileNameInput.value;
    document.querySelector('.profile__description').textContent = profileDescriptionInput.value;

    closeModal(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleFormEditSubmit);

// Обработка при добавлении фотографий

const popupAddCardButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const formAddCard = document.forms[1];
const cardNameInput = formAddCard.elements['place-name'];
const cardLinkInput = formAddCard.elements.link;

popupAddCardButton.addEventListener('click', () => {
    openModal(popupAdd);
});

function handleFormAddSubmit(evt) {
    evt.preventDefault(); 

    const cardData = buildCardData(cardNameInput.value, cardLinkInput.value);

    const cardElement = createCard(cardData, deleteCard, likeCard, showImage)
    placesList.prepend(cardElement);

    closeModal(popupAdd);

    formAddCard.reset();
}

formAddCard.addEventListener('submit', handleFormAddSubmit);
