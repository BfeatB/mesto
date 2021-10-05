import { PopupWithForm } from "./PopupWithForm.js";

export class PopupWithConfirmation extends PopupWithForm {
    constructor(selector, onFormSubmit) {
        super(selector, onFormSubmit);
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