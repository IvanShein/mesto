export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  };


  _handleClickOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };


  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  };


  setEventListeners() {
      const popupClose = this._popup.querySelector('.popup__close-button');
      popupClose.addEventListener('click', () => {
        this.close()
      });
      this._popup.addEventListener('mousedown', this._handleClickOnOverlay);
  };
};
