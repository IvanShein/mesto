import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import "./index.css"

// Массив со стартовым набором карточек
export const initialCards = [
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

// Глобальные переменные

export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const photoFlexItem = '.cards';
export const imageModal = document.querySelector('.popup__foto');
export const imageModalTitle = document.querySelector('.popup__figcaption');

// объект с настройками селекторов и классов для валидации, пердается при создании экземпляров класса FormValidator
export const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const formValidator = new Object();

function enableValidity(el) {
  const form = Array.from(document.querySelectorAll(el.formSelector))
  form.forEach((form) => {
    const validator = new FormValidator(el, form)
    const name = form.getAttribute('name')
    formValidator[name] = validator;
    validator.enableValidation();
  });
};

enableValidity(enableValidationConfig);


function createCard(cardInfo) {
  const cardElement = new Card(cardInfo, '#card', () => {
    {popupWithImage.open(cardInfo)}
    console.log('Это мы передаем в попап как cardinfo', cardInfo);
  }).generateCard();

  return cardElement;
};


const cards = new Section({
  items: initialCards,
  renderer: (data) => {
    cards.addItem(createCard(data));
    },
  },
  photoFlexItem
);
cards.renderItems();


const popupWithImage = new PopupWithImage('.popup_type_foto')
popupWithImage.setEventListeners();



const popupAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  submitProfileFormHandler: (data) => {
    cards.addItem(createCard(data));
    },
});
popupAdd.setEventListeners();



addButton.addEventListener('click', () => {
  popupAdd.open();
  const addButton = popupAdd.getformPopup();
  formValidator[addButton.getAttribute('name')].validityReset();
});


const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submitProfileFormHandler
});
popupEdit.setEventListeners();

const userInfo = new UserInfo(profileName, profileJob);


editButton.addEventListener('click', () => {
  popupEdit.open();
  const formEdit = popupEdit.getformPopup();
  const el = userInfo.getUserInfo();
  console.log ('getUserInfo взял это', el);
  nameInput.value = el.name;
  jobInput.value = el.job;
  formValidator[formEdit.getAttribute('name')].validityReset();
});


function submitProfileFormHandler(el){
  userInfo.setUserInfo(nameInput.value, jobInput.value);
}
