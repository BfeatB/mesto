import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImg = this._popupEl.querySelector(".popup__img-gallery");
        this._popupCaption = this._popupEl.querySelector(".popup__figcaption");
    }

    open({src, alt}) {
        super.open();this._popupImg.setAttribute("src", src);
        this._popupImg.setAttribute("alt", alt);
        this._popupCaption.textContent = alt;
    }
}