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
const imagePopupFoto = document.querySelector('.popup__foto');
const figcaptionPopupFoto = document.querySelector('.popup__figcaption');

// Функции

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener("keydown", closeOnEscKey);
  popupType.addEventListener("mousedown", closeOnClickOverlay);
  // Проверяем валидность полей сразу при открытии модального окна и деактивируем кнопку, если есть невалидные поля
  // Используем функцию toggleButtonState, объявленную в validate.js
  // const inputList = Array.from(popupType.querySelectorAll('.form__input'));
  // const buttonElement = popupType.querySelector('.form__submit');
  // toggleButtonState(inputList, buttonElement);
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeOnEscKey);
  popupType.removeEventListener("mousedown", closeOnClickOverlay);
}

function openPopupEdit(evt) {
  evt.preventDefault();
  inputName.value=profileName.textContent;
  inputDescription.value=profileDescription.textContent;
  openPopup(popupEdit);
}

function openPopupAdd(evt) {
  evt.preventDefault();
  openPopup(popupAdd);
}

function closePopupEdit() {
  closePopup(popupEdit);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function closePopupFoto() {
  closePopup(popupFoto);
}

function changeUser(evt) {
  evt.preventDefault();
  profileName.textContent=inputName.value;
  profileDescription.textContent=inputDescription.value;
  closePopupEdit();
  console.log('Данные пользователя изменены');
}

// Добавление карточек - мест. При создании каждой карточки добавляется обработчик событий
// для удаления карточки, для кнопки Like, для открытия модального окна с фотографией


function createCard(place = 'не задано', fotoLink = '../images/no-image.jpg') {
  const template = document.querySelector('#card');
  const newCard = template.content.querySelector('.cards__item').cloneNode(true);
  const imageCard = newCard.querySelector('.cards__image');
  newCard.querySelector('.cards__title').textContent = place;
  imageCard.src = fotoLink;
  imageCard.alt = `Изображение места - ${place}`;

  function likeCardOnOff(evt) {
    evt.target.classList.toggle('cards__like-button_active');
  }

  function deleteCard(evt) {
    evt.target.closest('.cards__item').remove();
  }

  function openPopupFoto(place, fotoLink) {
    imagePopupFoto.src = fotoLink;
    imagePopupFoto.alt = `Изображение места - ${place}`;
    figcaptionPopupFoto.textContent = place;
    openPopup(popupFoto);
  }

  function openPopupFotoWithFoto() {
    openPopupFoto(place, fotoLink);
  }

  newCard.querySelector('.cards__like-button').addEventListener('click', likeCardOnOff);
  newCard.querySelector('.cards__trash-button').addEventListener('click', deleteCard);
  newCard.querySelector('.cards__foto-button').addEventListener('click', openPopupFotoWithFoto);

  return newCard;
}

function closeOnClickOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

function closeOnEscKey (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function renderCard(place = 'не задано', fotoLink = '../images/no-image.jpg') {
  cardsContainer.prepend(createCard(place, fotoLink));
}

function addNewCard(evt) {
  evt.preventDefault();
  const cardPlace = inputPlace.value;
  const cardFotoLink = inputFotoLink.value;
  renderCard(cardPlace, cardFotoLink);
  closePopupAdd();
  inputPlace.value = '';
  inputFotoLink.value = '';
  console.log('Новая карточка добавлена');
}

// Обработчики событий

buttonEditProfile.addEventListener('click', openPopupEdit);
buttonClosePopupEdit.addEventListener('click', closePopupEdit);
formEdit.addEventListener('submit', changeUser);

buttonOpenPopupAdd.addEventListener('click', openPopupAdd);
buttonClosePopupAdd.addEventListener('click', closePopupAdd);
formAdd.addEventListener('submit', addNewCard);

buttonClosePopupFoto.addEventListener('click', closePopupFoto);


// Добавление на страницу карточек из стартового комплекта

const elements = initialCards.forEach(function(element) {
  cardsContainer.append(createCard(element.name, element.link));
});





















