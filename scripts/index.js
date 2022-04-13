const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const form = document.querySelector('.popup__form');

function edit() {
  inputName.value=profileName.textContent;
  inputDescription.value=profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function close() {
  popup.classList.remove('popup_opened');
}

function changeUser(evt) {
  evt.preventDefault();
  console.log('Форма отправлена');
  profileName.textContent=inputName.value;
  profileDescription.textContent=inputDescription.value;
  close();
}

editButton.addEventListener('click', edit);
closeButton.addEventListener('click', close);
form.addEventListener('submit', changeUser);