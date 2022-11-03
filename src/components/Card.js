export default class Card {

  constructor(cardInfo, userId, templateSelector, handleClickDelete, handleClickLike, handleCardClick) {
    this._templateSelector = templateSelector;
    this._cardUserId = userId;
    this._cardId = cardInfo._id;
    this._cardName = cardInfo.name;
    this._cardFotoLink = cardInfo.link;
    this.likes = cardInfo.likes;
    this._cardNumberLikes = cardInfo.likes.length;
    this._cardOwnerId = cardInfo.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleClickDelete = handleClickDelete;
    this._handleClickLike = handleClickLike;
    this._cardInfo = cardInfo;
    this.isCardLiked = false;
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
    this._handleCardClick(this._cardName, this._cardFotoLink);
  };


  _deleteCardElement() {
    this._element.remove();
    this._element =  null;
  };

  _setLikeCardElement() {
    this._cardLikeButtonElement.classList.add('cards__like-button_active');
  };

  _removeLikeCardElement() {
    this._cardLikeButtonElement.classList.remove('cards__like-button_active');
  };

  _isCardLiked(likesArray) {
   if(likesArray.some(like => like._id === this._cardUserId)) {
    this.isCardLiked = true;
   }
   else {
    this.isCardLiked = false;
   }
  }

  setCardLikes(likesArray) {
    this._cardNumberLikesElement.textContent = likesArray.length;
    this._isCardLiked(likesArray);
    if (this.isCardLiked) {
      this._setLikeCardElement();
    }
      else {
        this._removeLikeCardElement();
      }
  };

  _setEventListeners() {
    this._cardFotoElement.addEventListener('click', () => {
      this._handleClickImgOpenFullscreen();
    });
    this._cardTrashButtonElement.addEventListener('click', () => {
      this._handleClickDelete(this, this._cardId);
    });
    this._cardLikeButtonElement.addEventListener('click', () => {
      this._handleClickLike(this);
    });
  };

  activateTrashButton() {
    this._cardTrashButtonElement.classList.add('cards__trash-button_active');
  };

  generateCard() {
    this._element = this._getTemplate();

    this._cardNameElement = this._element.querySelector('.cards__title');
    this._cardFotoElement = this._element.querySelector('.cards__image');
    this._cardLikeButtonElement = this._element.querySelector('.cards__like-button');
    this._cardTrashButtonElement = this._element.querySelector('.cards__trash-button');
    this._cardNumberLikesElement = this._element.querySelector('.cards__number-likes');

    this._cardNameElement.textContent = this._cardName;
    this._cardFotoElement.src = this._cardFotoLink;
    this._cardFotoElement.alt = this._cardName;
    this.setCardLikes(this.likes);

    if(this._cardUserId === this._cardOwnerId){
      this.activateTrashButton();
    }



    this._setEventListeners();
    return this._element;
  };

}
