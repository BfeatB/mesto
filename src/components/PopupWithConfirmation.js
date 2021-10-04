import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selector, onFormSubmit) {
        super(selector);
        this._onFormSubmit = onFormSubmit;
        this._form = this._popupEl.querySelector(".popup__form")
    }

    open(cardId, afterFormSubmit) {
        this._cardId = cardId;
        this._afterFormSubmit = afterFormSubmit;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._onFormSubmit(this._cardId, this._afterFormSubmit);
        })
    }
}