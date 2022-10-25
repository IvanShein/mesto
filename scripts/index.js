import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Массив со стартовым набором карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// объект с настройками селекторов и классов для валидации, пердается при создании экземпляров класса FormValidator

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Создание экземпляров класса FormValidator для валидируемых форм, запуск валидации

    const newPlace = new FormValidator(config, document.forms.newPlace);
    newPlace.enableValidation();

    const editProfile = new FormValidator(config, document.forms.editProfile);
    editProfile.enableValidation();


// Глобальные переменные

const popupEdit = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupEdit = document.querySelector('.popup__close-button_type_edit');
const formEdit = document.querySelector('.popup__form_type_edit');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const popupAdd = document.querySelector('.popup_type_add');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupAdd = document.querySelector('.popup__close-button_type_add');
const popupFoto = document.querySelector('.popup_type_foto');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputFotoLink = document.querySelector('.popup__input_type_foto-link');
const cardsContainer = document.querySelector('.cards');
const formAdd = document.querySelector('.popup__form_type_add');
const buttonClosePopupFoto = document.querySelector('.popup__close-button_type_foto');

// Функции

const openPopup = (popupType) => {
  popupType.classList.add('popup_opened');
  document.addEventListener("keydown", closeOnEscKey);
  popupType.addEventListener("mousedown", closeOnClickOverlay);
};

const closePopup = (popupType) => {
  popupType.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeOnEscKey);
  popupType.removeEventListener("mousedown", closeOnClickOverlay);
};

const openPopupEdit = () => {
  editProfile.resetValidation();
  inputName.value=profileName.textContent;
  inputDescription.value=profileDescription.textContent;
  openPopup(popupEdit);
};

const openPopupAdd = () => {
  inputPlace.value = '';
  inputFotoLink.value = '';
  newPlace.resetValidation();
  openPopup(popupAdd);
};

const closePopupEdit = () => {
  closePopup(popupEdit);
};

const closePopupAdd = () => {
  closePopup(popupAdd);
};

const closePopupFoto = () => {
  closePopup(popupFoto);
};

const changeUser = (evt) => {
  evt.preventDefault();
  profileName.textContent=inputName.value;
  profileDescription.textContent=inputDescription.value;
  closePopupEdit();
};

const closeOnClickOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};

const closeOnEscKey = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  };
};

const createCard = (place, fotoLink) => {
  const data = {};
  data.name = place;
  data.link = fotoLink;
  const card = new Card(data, openPopup, '#card');
  return card.createCardElement();
};

const renderCard = (place = 'не задано', fotoLink = '../images/no-image.jpg') => {
  cardsContainer.prepend(createCard(place, fotoLink));
};

const addNewCard = (evt) => {
  evt.preventDefault();
  const cardPlace = inputPlace.value;
  const cardFotoLink = inputFotoLink.value;
  renderCard(cardPlace, cardFotoLink);
  closePopupAdd();
  inputPlace.value = '';
  inputFotoLink.value = '';
};

// Обработчики событий

buttonEditProfile.addEventListener('click', openPopupEdit);
buttonClosePopupEdit.addEventListener('click', closePopupEdit);
formEdit.addEventListener('submit', changeUser);

buttonOpenPopupAdd.addEventListener('click', openPopupAdd);
buttonClosePopupAdd.addEventListener('click', closePopupAdd);
formAdd.addEventListener('submit', addNewCard);

buttonClosePopupFoto.addEventListener('click', closePopupFoto);


// Добавление на страницу карточек из стартового комплекта

initialCards.forEach((element) => {
  cardsContainer.append(createCard(element.name, element.link));
});
