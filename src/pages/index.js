import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import "./index.css"


// Глобальные переменные

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileNameSelector = '.profile__title';
const profileJobSelector = '.profile__subtitle';
const profileAvatarSelector = '.profile__avatar';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardsContainerSelector = '.cards';

// объект с настройками селекторов и классов для валидации, пердается при создании экземпляров класса FormValidator
export const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'd415efd6-2d04-408b-a1d7-6b65d68d7d92',
    'Content-Type': 'application/json'
  }
});


const userInfo = new UserInfo({profileNameSelector , profileJobSelector, profileAvatarSelector});

// console.log('это апи ', api);
api.getUserInformation()
.then(data => {
  console.log ('Это данные пользователя с сервера:', data);
  userInfo.setUserInfo(data.name, data.about);
  userInfo.setUserAvatar(data.avatar);
  console.log ('User объект:', userInfo);
  return userInfo
})
  .then(userInfo => {
    console.log('User объект на следующий then:', userInfo);
    userInfo.renderUserData();
  });

api.getInitialCards()
.then(data => {
  renderInitialCards(data);
});



// initialCards = Array.from (initialCards);
// console.log ('Это ПЕРВОНАЧАЛЬНЫЕ карточки:', initialCard);
// console.log ('Это новые карточки:', initialCards);

// Массив со стартовым набором карточек
// const initialCards = api.getInitialCards().then(data);





const formValidator = {};
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

  }).generateCard();

  return cardElement;
};

function renderInitialCards(initialCards) {
const cards = new Section({
  items: initialCards,
  renderer: (data) => {
    cards.addItem(createCard(data));
    },
  },
  cardsContainerSelector
);
cards.renderItems();
};

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




editButton.addEventListener('click', () => {
  popupEdit.open();
  const formEdit = popupEdit.getformPopup();
  const el = userInfo.getUserInfo();

  nameInput.value = el.name;
  jobInput.value = el.job;
  formValidator[formEdit.getAttribute('name')].validityReset();
});


function submitProfileFormHandler(el){
  userInfo.setUserInfo(nameInput.value, jobInput.value);
}

