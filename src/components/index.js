import '../pages/index.css';
import { createCard, removeCard, likeCard} from './card.js'
import { openModal, closeModal, closeWithX } from './modal.js'
import { enableValidation, clearValidation, checkButton } from './validation.js'
import { getInitialData, getUserInfo, updateUserInfo, addCard, deleteCard, setLike, deleteLike, updateAvatar } from './api.js'

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
        .then(() => { 
            removeCard(cardElement);
        }) 
        .catch((err) => console.error(err));
}

// Постановка/снятие лайка
function onLikeCard(evt, id) {
    const isLiked = evt.target.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? deleteLike : setLike; 
    likeMethod(id) 
        .then((card) => { 
            likeCard(evt, card.likes.length);
        }) 
        .catch((err) => console.error(err));
}

// Инициализация пользователя и карточек
getInitialData()
    .then((results) => {
        setProfile(results[0]);

        userId = results[0]._id;

        results[1].forEach(function(item) {

            const cardElement = createCard(item, onDeleteCard, onLikeCard, openPopupImage, userId)
            placesList.append(cardElement);
        });
    })
    .catch((err) => {
        console.log(err);
    }); 

// Открытие изображения карточки
const openPopupImage = (name, link) => {
    openModal(popupShowImage);
    cardImage.setAttribute('src', link)
    cardImage.setAttribute('alt', name)
    cardName.textContent = name;
}

popupShowImage.addEventListener("click", (evt) => {
    closeWithX(evt);
});

// ФОРМЫ

// Форма редактирования профиля
popupEditProfile.addEventListener("click", (evt) => {
    closeWithX(evt);
});

popupEditButton.addEventListener('click', () => {
    profileNameInput.value = userName.textContent;
    profileDescriptionInput.value = userAbout.textContent;
    clearValidation(formEditProfile, validationConfig);
    openModal(popupEditProfile);
});

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    
    const popupButton = formEditProfile.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';

    userName.textContent = profileNameInput.value;
    userAbout.textContent = profileDescriptionInput.value;

    updateUserInfo(profileNameInput.value, profileDescriptionInput.value)
    .then(getUserInfo())
    .then((profile) => setProfile(profile))
    .finally(() => {
        popupButton.textContent = 'Сохранить';
        closeModal(popupEditProfile);
    });
}

formEditProfile.addEventListener('submit', handleFormEditSubmit);

// Форма добавления карточки
popupAdd.addEventListener('click', (evt) => {
    closeWithX(evt);
});

popupAddCardButton.addEventListener('click', () => {
    openModal(popupAdd);
});

function handleFormAddSubmit(evt) {
    evt.preventDefault(); 

    const popupButton = formAddCard.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';

    addCard(cardNameInput.value, cardLinkInput.value)
        .then((cardData) => {
            const cardElement = createCard(cardData, onDeleteCard, onLikeCard, openPopupImage, userId)
            placesList.prepend(cardElement);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupButton.textContent = 'Сохранить';
            closeModal(popupAdd);
        });

    formAddCard.reset();
    checkButton(formAddCard, validationConfig);
}

formAddCard.addEventListener('submit', handleFormAddSubmit);

// Форма редактирования аватара
userAvatar.addEventListener('click', () => {
    openModal(avatarEditPopup);
});

avatarEditPopup.addEventListener("click", (evt) => {
    closeWithX(evt);
});

function handleFormEditAvatarSubmit(evt) {
    evt.preventDefault();
    
    const popupButton = formEditAvatar.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';

    const link = formEditAvatar.avatar.value;
    updateAvatar(link)
    .then((profile) => setProfile(profile))
    .finally(() => {
        popupButton.textContent = 'Сохранить';
        closeModal(avatarEditPopup);
    });
}

formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);

// Валидация
enableValidation(validationConfig);
