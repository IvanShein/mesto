const popupFoto = document.querySelector('.popup_type_foto');

export class Card {
  constructor(data, openPopup, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._openPopup = openPopup;
  }

  _copyCardTemplate() {
    this._template = document.querySelector(this._templateSelector);
    this._newCard = this._template.content.querySelector('.cards__item').cloneNode(true);
    return this._newCard;
  }

  _likeCardOnOff() {
    this._newCard.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
  }

  _deleteCard() {
    this._newCard.querySelector('.cards__trash-button').closest('.cards__item').remove();
  }

  _openPopupFoto() {
    this._imagePopupFoto = document.querySelector('.popup__foto');
    this._imagePopupFoto.src = this._link;
    this._imagePopupFoto.alt = `Изображение места - ${this._name}`;
    document.querySelector('.popup__figcaption').textContent = this._name;
    this._openPopup(popupFoto);
  }

  _openPopupFotoWithFoto() {
    this._openPopupFoto(this._name, this._link);
  }

  _setEventListeners() {
    this._newCard.querySelector('.cards__like-button').addEventListener('click', () => {
      this._likeCardOnOff();
      });
    this._newCard.querySelector('.cards__trash-button').addEventListener('click', () => {
      this._deleteCard();
      });
    this._newCard.querySelector('.cards__foto-button').addEventListener('click', () => {
      this._openPopupFotoWithFoto();
      });
  }

  createCardElement() {
    this._newCard = this._copyCardTemplate();
    this._imageCard = this._newCard.querySelector('.cards__image');
    this._newCard.querySelector('.cards__title').textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = `Изображение места - ${this._name}`;
    this._setEventListeners();
    return this._newCard;
  }

};
