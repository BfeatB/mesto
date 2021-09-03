export class Card {
  constructor(card, onCardImgClick, templateSelector) {
    this.card = card;
    this.templateSelector = templateSelector;
    this.onCardImgClick = onCardImgClick;
  }

  _setEventListeners() {
    const cardNodeImg = this.element.querySelector(".card__img");

    cardNodeImg.addEventListener("click", this.onCardImgClick);

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
    const cardTemplate = document.querySelector(this.templateSelector);
    const cardNode = cardTemplate.content.firstElementChild.cloneNode(true);
    return cardNode;
  }

  generateCard() {
    this.element = this._getTemplate();
    const cardNodeImg = this.element.querySelector(".card__img");
    cardNodeImg.setAttribute("src", this.card.link);
    cardNodeImg.setAttribute("alt", this.card.alt);
    this.element.querySelector(".card__capture").textContent = this.card.name;

    this._setEventListeners();

    return this.element;
  }
}
