import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector,  onFormSubmit) {
        super(popupSelector);
        this.onFormSubmit = onFormSubmit;
        this.inputs = this.popupEl.querySelectorAll(".popup__input");
        this.form = this.popupEl.querySelector(".popup__form");
    }

    _getInputValues() {
        const formInput = {};
        this.inputs.forEach((input) => {
            formInput[input.name] = input.value
        });
        
        return formInput;
    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", (evt) => {
            this.onFormSubmit(this._getInputValues());
            evt.preventDefault();
        });
    }

    close() {
        this.form.reset();
        super.close();
    }
}