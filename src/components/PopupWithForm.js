import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFormHandler}) {
    super(popupSelector);
    this._formPopupElement = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitFormHandler = submitFormHandler;
  };

  getformPopup() {
    return this._formPopupElement;
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) =>
     this._formValues[input.name] = input.value);
    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._formPopupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitFormHandler(this._getInputValues());
      this.close();
    });
  };

  close() {
    super.close()
    this._formPopupElement.reset();
  };
}
