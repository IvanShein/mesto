import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, submitDeleteConfirmationHandler}) {
    super(popupSelector);
    this._formPopupElement = this._popup.querySelector('.popup__form');
    this._submitDeleteConfirmationHandler = submitDeleteConfirmationHandler;
    this.card = {};
    this.cardId = '';
  };

  getformPopup() {
    return this._formPopupElement;
  };

  open(card, cardId) {
    super.open();
    this.card = card;
    this.cardId = cardId;
  };

  // submitDeleteConfirmation(event) {
  //   event.preventDefault();
  //   this._submitDeleteConfirmationHandler(this.card, this.cardId);
  //   this.close();
  // }

  setEventListeners() {
    super.setEventListeners();
    this._formPopupElement.addEventListener('submit', (event) => {
    event.preventDefault();
    this._submitDeleteConfirmationHandler(this.card, this.cardId);
    });
  };

  // removeEventListeners() {
  //   this._formPopupElement.removeEventListener('submit', this.submitDeleteConfirmation.bind(this));
  // };

  close() {
    super.close()
    this.card = {};
    this.cardId = '';
  };
}
