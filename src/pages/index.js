import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import "./index.css"

// Глобальные переменные

const nameInputElement = document.querySelector('.popup__input_type_name');
const jobInputElement = document.querySelector('.popup__input_type_description');
const avatarLinkInputElement = document.querySelector('.popup__input_type_avatar');
const editButtonElement = document.querySelector('.profile__edit-button');
const profileAvatarElement = document.querySelector('.profile__avatar');
const addButtonElement = document.querySelector('.profile__add-button');

const profileNameSelector = '.profile__title';
const profileJobSelector = '.profile__subtitle';
const profileAvatarSelector = '.profile__avatar';
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
const cards = new Section({
  items: [],
  renderer: (data) => {
    cards.addItem(createCard(data));
    },
  },
  cardsContainerSelector
);

function loadFromServerUserInformation() {
return api.getUserInformation()
.then(data => {
  userInfo.setUserInfo(data.name, data.about, data._id);
  userInfo.setUserAvatar(data.avatar);
  return userInfo
})
  .then(userInfo => {
    userInfo.renderUserData()
  })
  .then(() => console.log('следующий зен '))
};

// используется последовательность промисов, чтобы карточки
// рендерились только после того, как с сервера загрузятся
// данные пользователя и данные карточек
loadFromServerUserInformation()
.then(() => {
  return api.getInitialCards()
  })
  .then((data) => {
    renderInitialCards(data);
  });

const formValidator = {};
function enableValidity(validationConfig) {
  const form = Array.from(document.querySelectorAll(validationConfig.formSelector))
  form.forEach((form) => {
    const validator = new FormValidator(validationConfig, form)
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
cards.items = initialCards;
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



addButtonElement.addEventListener('click', () => {
  popupAdd.open();
  const addButtonElement = popupAdd.getformPopup();
  formValidator[addButtonElement.getAttribute('name')].validityReset();
});

function submitProfileAvatarFormHandler(){
  api.sendUserAvatarLink(avatarLinkInputElement.value)
  .then(() => {return Promise.resolve(loadFromServerUserInformation())})
};

// создать новую модификацию класа
const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  submitProfileFormHandler: submitProfileAvatarFormHandler
});
console.log('это попап аватара', popupEditAvatar);

console.log('это функция обработки сабмита формы аватара', submitProfileAvatarFormHandler);
popupEditAvatar.setEventListeners();

// function submitProfileAvatarFormHandler(){
//   api.sendUserAvatarLink(avatarLinkInputElement.value)
//   .then(() => {return Promise.resolve(loadFromServerUserInformation())})
// };

profileAvatarElement.addEventListener('click', () => {
  popupEditAvatar.open();
  const formEditAvatar = popupEditAvatar.getformPopup();
  formValidator[formEditAvatar.getAttribute('name')].validityReset();
});

editButtonElement.addEventListener('click', () => {
  popupEdit.open();
  const formEdit = popupEdit.getformPopup();
  const user = userInfo.getUserInfo();

  nameInputElement.value = user.name;
  jobInputElement.value = user.job;
  formValidator[formEdit.getAttribute('name')].validityReset();
});

const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submitProfileFormHandler
});
popupEdit.setEventListeners();

function submitProfileFormHandler(){
  api.sendUserInformation(nameInputElement.value, jobInputElement.value)
  .then(() => {return Promise.resolve(loadFromServerUserInformation())})
};

console.log('это попап редактирования', popupEdit);
