import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open({src, alt}) {
        super.open();
        const popupImg = this._popupEl.querySelector(".popup__img-gallery");
        const popupCaption = this._popupEl.querySelector(".popup__figcaption");

        popupImg.setAttribute("src", src);
        popupImg.setAttribute("alt", alt);
        popupCaption.textContent = alt;
    }
}