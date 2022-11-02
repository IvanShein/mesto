export default class Card {

  constructor(cardInfo, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._imageNameCard = cardInfo.name;
    this._imageLinkCard = cardInfo.link;
    this._handleCardClick = handleCardClick;
    this._cardInfo = cardInfo;
  };

    _getTemplate() {
    const template = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('#container')
    .cloneNode(true);

    return template;
  };

  _handleClickImgOpenFullscreen() {
    this._handleCardClick(this._imageNameCard, this._imageLinkCard);
  };


  _handleClickDelete() {
    this._element.remove();
    this._element =  null;
  };


  _handleClickLike() {
    this._like.classList.toggle('cards__like-button_active');
  };

  _setEventListeners() {
    this._imgCardLink.addEventListener('click', () => {
      this._handleClickImgOpenFullscreen();
    });
    this._trash.addEventListener('click', () => {
      this._handleClickDelete();
    });
    this._like.addEventListener('click', () => {
      this._handleClickLike();
    });
  };

  activateTrashButton() {
    this._trash.classList.add('cards__trash-button_active');
  };

  generateCard() {
    this._element = this._getTemplate();

    this._imgCardNameElement = this._element.querySelector('.cards__title');
    this._imgCardLink = this._element.querySelector('.cards__image');
    this._like = this._element.querySelector('.cards__like-button');
    this._trash = this._element.querySelector('.cards__trash-button');

    this._imgCardNameElement.textContent = this._imageNameCard;
    this._imgCardLink.src = this._imageLinkCard;
    this._imgCardLink.alt = this._imageNameCard;

    if(this._imageNameCard.length > 5){
      this.activateTrashButton();
    }



    this._setEventListeners();
    return this._element;
  };

}
