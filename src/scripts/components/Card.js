export default class Card {
  constructor({ data, handleCardClick, handleConfirmCardDelete, handlePutCardLike, handleRemoveCardLike }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likesArr = data.likes;
    this._getMyId = data.myId;
    this._handleCardClick = handleCardClick;
    this._handleConfirmCardDelete = handleConfirmCardDelete;
    this._handlePutCardLike = handlePutCardLike;
    this._handleRemoveCardLike = handleRemoveCardLike;
    this._templateSelector = templateSelector;
  }

  _getTemplateCardElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  removeCard() {
    this._element.remove()
  }

  getCardId() {
    return this._cardId;
  }

  cardAddLike() {
    this._likeButton.classList.add('card__like_active');
  }

  cardDeleteLike() {
    this._likeButton.classList.remove('card__like_active');
  }

  showQuantityCardLikes(count) {
    this._quantityCardLike.textContent = count;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (!this._likeButton.classList.contains('card__like_active')) {
        this._handlePutCardLike();
      } else {
        this._handleRemoveCardLike();
      }
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleConfirmCardDelete();
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplateCardElement();

    this._likeButton = this._element.querySelector('.card__like');
    this._likesArr.forEach(item => {
      if (item._id === this._getMyId) {
        this.cardAddLike();
      }
    });

    this._cardDeleteButton = this._element.querySelector('.card__delete');
    if (this._ownerId !== this._getMyId) {
      this._cardDeleteButton.remove()
    }

    this._quantityCardLike = this._element.querySelector('.card__quantity');
    this._quantityCardLike.textContent = this._likesArr.length;

    this._cardImg = this._element.querySelector('.card__img');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}


