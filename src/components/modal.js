export const openModal = function (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeWithKey);
}

export const closeModal = function (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeWithKey);
}

  function closeWithKey(evt) {
    if (evt.key === 'Escape') {
      const popupOpen = document.querySelector('.popup_is-opened');
      closeModal(popupOpen);
    }
  }
  
  export function closeWithX (evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains("popup")) {
        closeModal(evt.target.closest('.popup'));
    }
  }