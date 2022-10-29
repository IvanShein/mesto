import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitProfileFormHandler }) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._formPopup = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._submitProfileFormHandler = submitProfileFormHandler;
  }


  getformPopup() {
    return this._formPopup;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) =>
     this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitProfileFormHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close()
    this._formPopup.reset();
  }
}
