import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


// Глобальные переменные

const nameInputElement = document.querySelector('.popup__input_type_name');
const jobInputElement = document.querySelector('.popup__input_type_description');
const avatarLinkInputElement = document.querySelector('.popup__input_type_avatar');
const editButtonElement = document.querySelector('.profile__edit-button');
const profileAvatarEditElement = document.querySelector('.profile__avatar-edit');
const addButtonElement = document.querySelector('.profile__add-button');

const profileNameSelector = '.profile__title';
const profileJobSelector = '.profile__subtitle';
const profileAvatarSelector = '.profile__avatar';
const cardsContainerSelector = '.cards';

// объект с настройками селекторов и классов для валидации, пердается при создании экземпляров класса FormValidator
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Настройки для модуля Api
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
    cards.appendItem(createCard(data));
    },
  },
  cardsContainerSelector
);

// загрузка с сервера данных пользователя
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
};

function renderCardsFromServer() {
  api.getInitialCards()
  .then((data) => {
    renderInitialCards(data)
  })
  .catch((error) => {
    console.log(`К сожалению, возникла ошибка: ${error}`);
  })
};

// используется последовательность промисов, чтобы карточки
// рендерились только после того, как с сервера загрузятся
// данные пользователя и данные карточек
loadFromServerUserInformation()
.then(() => {
  renderCardsFromServer()
})
.catch((error) => {
  console.log(`К сожалению, возникла ошибка: ${error}`);
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
enableValidity(validationConfig);


function submitDeleteConfirmationHandler(card, cardId) {
  api.deleteCard(cardId)
  .then(() => {
    card.deleteCardElement();
    popupWithConfirmation.close();
  })
  .catch((error) => {
    console.log(`К сожалению, возникла ошибка: ${error}`);
  })
};

function handleClickDelete(card, cardId) {
  popupWithConfirmation.open(card, cardId);
};

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-confirmation',
  submitDeleteConfirmationHandler
});
popupWithConfirmation.setEventListeners();

function handleClickLike(card) {
  if(card.isCardLiked) {
    api.deleteCardLike(card.cardId)
    .then((cardInfo) => {
      card.setCardLikes(cardInfo.likes)
    })
    .catch((error) => {
      console.log(`К сожалению, возникла ошибка: ${error}`);
    })
  }
  else {
    api.sendCardLike(card.cardId)
    .then((cardInfo) => {
      card.setCardLikes(cardInfo.likes)
    })
    .catch((error) => {
      console.log(`К сожалению, возникла ошибка: ${error}`);
    })
  }
};

function createCard(cardInfo) {
  const card = new Card(cardInfo, userInfo.id, '#card', handleClickDelete, handleClickLike, () => {
    popupWithImage.open(cardInfo);
  });
  const cardElement = card.generateCard();
  return cardElement;
};

function renderInitialCards(initialCards) {
  cards.items = initialCards;
  cards.renderItems();
};

const popupWithImage = new PopupWithImage('.popup_type_foto')
popupWithImage.setEventListeners();


const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_add',
  submitFormHandler: submitAddNewCard
});
popupAddNewCard.setEventListeners();

function submitAddNewCard(cardInfo) {
popupAddNewCard.changeSubmitButtonText('Сохранение...');
api.sendNewCard(cardInfo)
  .then((cardData) => {
    const cardElement = createCard(cardData);
    cards.prependItem(cardElement);
    popupAddNewCard.close();
  })
  .catch((error) => {
    console.log(`К сожалению, возникла ошибка: ${error}`);
  })
  .finally(() => {popupAddNewCard.changeSubmitButtonText('Создать')})
}

addButtonElement.addEventListener('click', () => {
  popupAddNewCard.open();
  const addButtonElement = popupAddNewCard.getFormPopup();
  formValidator[addButtonElement.getAttribute('name')].validityReset();
});

function submitProfileAvatarFormHandler() {
  popupEditAvatar.changeSubmitButtonText('Сохранение...');
  api.sendUserAvatarLink(avatarLinkInputElement.value)
    .then(() => {
      return Promise.resolve(loadFromServerUserInformation())
    })
    .then(() => {
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(`К сожалению, возникла ошибка: ${error}`);
    })
    .finally(() => {popupEditAvatar.changeSubmitButtonText('Сохранить')})
};


const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  submitFormHandler: submitProfileAvatarFormHandler
});
popupEditAvatar.setEventListeners();


profileAvatarEditElement.addEventListener('click', () => {
  popupEditAvatar.open();
  const formEditAvatar = popupEditAvatar.getFormPopup();
  formValidator[formEditAvatar.getAttribute('name')].validityReset();
});

editButtonElement.addEventListener('click', () => {
  popupEditProfile.open();
  const formEdit = popupEditProfile.getFormPopup();
  const user = userInfo.getUserInfo();
  nameInputElement.value = user.name;
  jobInputElement.value = user.job;
  formValidator[formEdit.getAttribute('name')].validityReset();
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submitFormHandler: submitProfileFormHandler
});
popupEditProfile.setEventListeners();

function submitProfileFormHandler(){
  popupEditProfile.changeSubmitButtonText('Сохранение...');
  api.sendUserInformation(nameInputElement.value, jobInputElement.value)
    .then(() => {return Promise.resolve(loadFromServerUserInformation())
    })
    .then(() => {
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log(`К сожалению, возникла ошибка: ${error}`);
    })
    .finally(() => {popupEditProfile.changeSubmitButtonText('Сохранить')})
};
