export class FormValidator {
  constructor(selectors, formSelector) {
    this._form = document.querySelector(formSelector);
    this._selectors = selectors;
    this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
    this._submitButton = this._form.querySelector(this._selectors.submitButtonSelector);
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._selectors .inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors .errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._selectors .inputErrorClass);
    errorElement.classList.remove(this._selectors .errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._form.addEventListener('reset', () => {
      this_disableButton();
    })
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _disableButton() {
    this._submitButton.classList.add(this._selectors.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  _enableButton() {
    this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  setInitialFormState() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
