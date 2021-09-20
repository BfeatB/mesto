export class Popup {
    constructor(selector) {
        this._selector = selector;
        this._popupEl = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._onOverlayClick = this._onOverlayClick.bind(this);
    }
    
    open() {
        this._popupEl.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
        document.addEventListener("mousedown", this._onOverlayClick);
    }

    close() {
        this._popupEl.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener("mousedown", this._onOverlayClick);
    }

    _onOverlayClick(evt) {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        }
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
              this.close();
        }
    }
    
    setEventListeners() {
        this._popupEl.querySelector(".popup__close").addEventListener("click", () => this.close());
    }
}