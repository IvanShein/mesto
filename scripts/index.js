// Попап редактирования профиля

const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeEditPopupButton = document.querySelector('.popup__close-button_type_edit');
const formEdit = document.querySelector('.popup__form_type_edit');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

function editOpen(evt) {
  evt.preventDefault();
  inputName.value=profileName.textContent;
  inputDescription.value=profileDescription.textContent;
  popupEdit.classList.add('popup_opened');
}

function closePopup() {
  popupEdit.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
  popupFoto.classList.remove('popup_opened');
}

function changeUser(evt) {
  evt.preventDefault();
  profileName.textContent=inputName.value;
  profileDescription.textContent=inputDescription.value;
  closePopup();
  console.log('Данные пользователя изменены');
}

editButton.addEventListener('click', editOpen);
closeEditPopupButton.addEventListener('click', closePopup);
formEdit.addEventListener('submit', changeUser);


// Попап добавления карточки - места

const popupAdd = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = document.querySelector('.popup__close-button_type_add');

function addOpen(evt) {
  evt.preventDefault();
  popupAdd.classList.add('popup_opened');
}

addButton.addEventListener('click', addOpen);
closeAddPopupButton.addEventListener('click', closePopup);

// Добавление карточек - мест

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

const inputPlace = document.querySelector('.popup__input_type_place');
const inputFotoLink = document.querySelector('.popup__input_type_foto-link');
const cardsContainer = document.querySelector('.cards');
const formAdd = document.querySelector('.popup__form_type_add');
const popupFoto = document.querySelector('.popup_type_foto');
const closeFotoPopupButton = document.querySelector('.popup__close-button_type_foto');

function createCard(place = 'не задано', fotoLink = '../images/no-image.jpg') {
  const template = document.querySelector('#card');
  const newCard = template.content.querySelector('.cards__item').cloneNode(true);
  newCard.querySelector('.cards__title').textContent = place;
  newCard.querySelector('.cards__image').src = fotoLink;
  newCard.querySelector('.cards__image').alt = `Изображение места - ${place}`;

  newCard.querySelector('.cards__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__like-button_active');
  });

  newCard.querySelector('.cards__trash-button').addEventListener('click', function(evt) {
    evt.target.closest('.cards__item').remove();
  });


  // Попап просмотра фотографии места

  newCard.querySelector('.cards__foto-button').addEventListener('click', function(evt) {
    popupFoto.querySelector('.popup__foto').src = newCard.querySelector('.cards__image').src;
    popupFoto.querySelector('.popup__foto').alt = newCard.querySelector('.cards__image').alt;
    popupFoto.querySelector('.popup__figcaption').textContent = place;
    popupFoto.classList.add('popup_opened');
  });


  return newCard;
}

closeFotoPopupButton.addEventListener('click', closePopup);


function renderCard(place = 'не задано', fotoLink = '../images/no-image.jpg') {
  cardsContainer.prepend(createCard(place, fotoLink));
}

function addNewCard(evt) {
  evt.preventDefault();
  const cardPlace = inputPlace.value;
  // console.log('тест');
  const cardFotoLink = inputFotoLink.value;
  renderCard(cardPlace, cardFotoLink);
  closePopup();
  inputPlace.value = '';
  inputFotoLink.value = '';
  console.log('Новая карточка добавлена');
}

formAdd.addEventListener('submit', addNewCard);

// Добавление на страницу карточек из стартового комплекта

const elements = initialCards.map(function(element) {
  return createCard(element.name, element.link);
});

cardsContainer.append(...elements);



















