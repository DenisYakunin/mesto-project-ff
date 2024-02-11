import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, buildCardData, likeCard, deleteCard } from './card.js'
import { openModal, closeModal, closeWithX } from './modal.js'

// Работа с изображениями

const popupShowImage = document.querySelector('.popup_type_image');
const cardImage = document.querySelector('.popup__image');
const cardName = document.querySelector('.popup__caption');

const openPopupImage = (name, link) => {
    openModal(popupShowImage);
    cardImage.setAttribute('src', link)
    cardImage.setAttribute('alt', link)
    cardName.textContent = name;
}

popupShowImage.addEventListener("click", (evt) => {
    closeWithX(evt);
});

// Инициализация карточек 

const placesList = document.querySelector('.places__list');

initialCards.forEach(function(item) {
    const cardElement = createCard(item, deleteCard, likeCard, openPopupImage)
    placesList.append(cardElement);
});

// Обработка при редактировании профиля

const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms['edit-profile'];
const profileNameInput = formEditProfile.elements.name;
const profileDescriptionInput = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function fillProfile () {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

fillProfile();

popupEditProfile.addEventListener("click", (evt) => {
    closeWithX(evt);
});

popupEditButton.addEventListener('click', () => {
    fillProfile();
    openModal(popupEditProfile);
});

function handleFormEditSubmit(evt) {
    evt.preventDefault(); 
    
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;

    closeModal(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleFormEditSubmit);

// Обработка при добавлении фотографий

const popupAddCardButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const formAddCard = document.forms['new-place'];
const cardNameInput = formAddCard.elements['place-name'];
const cardLinkInput = formAddCard.elements.link;

popupAdd.addEventListener("click", (evt) => {
    closeWithX(evt);
});

popupAddCardButton.addEventListener('click', () => {
    openModal(popupAdd);
});

function handleFormAddSubmit(evt) {
    evt.preventDefault(); 

    const cardData = buildCardData(cardNameInput.value, cardLinkInput.value);

    const cardElement = createCard(cardData, deleteCard, likeCard, openPopupImage)
    placesList.prepend(cardElement);

    closeModal(popupAdd);

    formAddCard.reset();
}

formAddCard.addEventListener('submit', handleFormAddSubmit);
