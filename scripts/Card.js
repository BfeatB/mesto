class Card {
  constructor(card, onCardImgClick, templateSelector) {
    this.card = card;
    this.templateSelector = templateSelector;
    this.onCardImgClick = onCardImgClick;
  }

  _setEventListeners(cardNode, cardNodeImg) {
    cardNodeImg.addEventListener("click", this.onCardImgClick);

    cardNode.querySelector(".card__like-button").addEventListener("click", this._onLikeButtonClick);

    cardNode.querySelector(".card__delete-button").addEventListener("click", this._onDeleteButtonClick);

  }

  _onLikeButtonClick(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  _onDeleteButtonClick(evt){
    evt.target.closest(".card").remove();
  }

  createCardNode() {
    const cardTemplate = document.querySelector(this.templateSelector);
    const cardNode = cardTemplate.content.firstElementChild.cloneNode(true);
    const cardNodeImg = cardNode.querySelector(".card__img");
    cardNodeImg.setAttribute("src", this.card.link);
    cardNodeImg.setAttribute("alt", this.card.alt);
    cardNode.querySelector(".card__capture").textContent = this.card.name;


    this._setEventListeners(cardNode, cardNodeImg);
    return cardNode;
  }
}
