class Popup {
    constructor(selector) {
        this.selector = selector;
        this.popupEl = document.querySelector(selector);
        this._handleEscClose = _handleEscClose;
    }
    
    open() {
        this.popupEl.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this.popupEl.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            const openedPopup = this.popupEl.querySelector(".popup_opened");
            if (openedPopup) {
              close(openedPopup);
            }
          }
    }
    
    setEventListeners() {
        this.popupEl.querySelector(".popup__close").addEventListener("click", onClickCloseButton);
    }
}