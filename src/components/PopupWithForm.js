import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector,  onFormSubmit) {
        super(popupSelector);
        this._onFormSubmit = onFormSubmit;
        this._inputs = this._popupEl.querySelectorAll(".popup__input");
        this._form = this._popupEl.querySelector(".popup__form");
    }

    _getInputValues() {
        const formInput = {};
        this._inputs.forEach((input) => {
            formInput[input.name] = input.value
        });
        return formInput;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            this._onFormSubmit(this._getInputValues());
            evt.preventDefault();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}