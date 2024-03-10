import '../pages/index.css';
import { createCard, removeCard, likeCard} from './card.js'
import { openModal, closeModal, closeWithClick } from './modal.js'
import { enableValidation, clearValidation, checkButton } from './validation.js'
import { getInitialData, updateUserInfo, addCard, deleteCard, setLike, deleteLike, updateAvatar } from './api.js'
import { handleSubmit } from './utils.js'


// Профиль
const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');

// Формы
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];
const formEditAvatar = document.forms['edit-avatar'];

// Список с карточками
const placesList = document.querySelector('.places__list');

// Попапы
const popups = document.querySelectorAll('.popup')
const popupShowImage = document.querySelector('.popup_type_image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');

// Кнопки
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddCardButton = document.querySelector('.profile__add-button');

// Инпуты
const cardNameInput = formAddCard.elements['place-name'];
const cardLinkInput = formAddCard.elements.link;
const profileNameInput = formEditProfile.elements.name;
const profileDescriptionInput = formEditProfile.elements.description;

// Картинка карточки
const cardImage = document.querySelector('.popup__image');
const cardName = document.querySelector('.popup__caption');

// Конфиг для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_is-active'
};

// ID пользователя
let userId;

// ОБЩИЙ ФУНКЦИОНАЛ

// Обновление данных пользователя
function setProfile(profile) {
    userName.textContent = profile.name;
    userAbout.textContent = profile.about;
    userAvatar.style.backgroundImage = `url(${profile.avatar})`;
}

// Удаление карточки
function onDeleteCard(cardElement, cardId) {
    deleteCard(cardId) 
        .then(() => removeCard(cardElement)) 
        .catch((err) => console.error(err));
}

// Постановка/снятие лайка
function onLikeCard(evt, id) {
    const isLiked = evt.target.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? deleteLike : setLike; 
    likeMethod(id) 
        .then((card) => likeCard(evt, card.likes.length)) 
        .catch((err) => console.error(err));
}

// Инициализация пользователя и карточек
getInitialData()
    .then(([userData, cards]) => {
        setProfile(userData);

        userId = userData._id;

        cards.forEach(function(item) {
            const cardElement = createCard(item, onDeleteCard, onLikeCard, openPopupImage, userId)
            placesList.append(cardElement);
        });
    })
    .catch((err) => console.error(err));

// Открытие изображения карточки
const openPopupImage = (name, link) => {
    openModal(popupShowImage);
    cardImage.setAttribute('src', link)
    cardImage.setAttribute('alt', name)
    cardName.textContent = name;
}

// Закрытие попапов
popups.forEach((popup) => {
    popup.addEventListener('click', closeWithClick);
});

// ФОРМЫ

// Форма редактирования профиля
popupEditButton.addEventListener('click', () => {
    profileNameInput.value = userName.textContent;
    profileDescriptionInput.value = userAbout.textContent;
    clearValidation(formEditProfile, validationConfig);
    openModal(popupEditProfile);
});

function handleProfileFormSubmit(evt) {
    function makeRequest() {
        return updateUserInfo(profileNameInput.value, profileDescriptionInput.value)
            .then(setProfile);
    }
    handleSubmit(makeRequest, closeModal, evt);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// Форма добавления карточки
popupAddCardButton.addEventListener('click', () => {
    openModal(popupAdd);
});

function handleCardFormSubmit(evt) {
    function makeRequest() {
        return addCard(cardNameInput.value, cardLinkInput.value)
        .then((cardData) => {
            const cardElement = createCard(cardData, onDeleteCard, onLikeCard, openPopupImage, userId)
            placesList.prepend(cardElement);
        });
    }
    handleSubmit(makeRequest, closeModal, evt);
}

formAddCard.addEventListener('submit', handleCardFormSubmit);

// Форма редактирования аватара
userAvatar.addEventListener('click', () => {
    openModal(avatarEditPopup);
});

function handleAvatarFormSubmit(evt) {
    function makeRequest() {
        return updateAvatar(formEditAvatar.avatar.value)
            .then(setProfile);
    }
    handleSubmit(makeRequest, closeModal, evt);
}

formEditAvatar.addEventListener('submit', handleAvatarFormSubmit);

// Валидация
enableValidation(validationConfig);
