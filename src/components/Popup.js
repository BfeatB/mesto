export class Popup {
    constructor(selector) {
        this.selector = selector;
        this.popupEl = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._onOverlayClick = this._onOverlayClick.bind(this);
    }
    
    open() {
        this.popupEl.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
        document.addEventListener("mousedown", this._onOverlayClick);
    }

    close() {
        this.popupEl.classList.remove("popup_opened");
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
        this.popupEl.querySelector(".popup__close").addEventListener("click", () => this.close());
    }
}