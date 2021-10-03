export class Card {
  constructor(card, handleCardClick, templateSelector, userId) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
  }

  _setEventListeners() {
    const cardNodeImg = this.element.querySelector(".card__img");

    cardNodeImg.addEventListener("click", this._handleCardClick);

    this.element.querySelector(".card__like-button").addEventListener("click", this._onLikeButtonClick);
    this.element.querySelector(".card__delete-button").addEventListener("click", this._onDeleteButtonClick);

  }

  _onLikeButtonClick(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  _onDeleteButtonClick(evt){
    evt.target.closest(".card").remove();
  }

  _getTemplate () {
    const cardTemplate = document.querySelector(this._templateSelector);
    const cardNode = cardTemplate.content.firstElementChild.cloneNode(true);

    return cardNode;
  }

  generateCard() {
    this.element = this._getTemplate();
    const cardNodeImg = this.element.querySelector(".card__img");

    cardNodeImg.setAttribute("src", this._card.link);
    cardNodeImg.setAttribute("alt", this._card.name);
    this.element.querySelector(".card__capture").textContent = this._card.name;
    this.element.querySelector(".card__like-counter").textContent = this._card.likes.length;

    if(this._card.owner._id === this._userId) {
      this.element.querySelector(".card__delete-button").classList.add("card__delete-button_visible");
    }

    this._setEventListeners();

    return this.element;
  }
}
