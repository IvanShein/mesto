import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageModal = this._popup.querySelector('.popup__foto');
    this._imageModalTitle = this._popup.querySelector('.popup__figcaption');
  };

  open(element) {
    super.open()
    this._imageModal.src = element.link;
    this._imageModal.alt = element.name;
    this._imageModalTitle.textContent = element.name;
  };
}
