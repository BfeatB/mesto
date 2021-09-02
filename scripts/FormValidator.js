export class FormValidator {
  constructor(selectors) {
    this.selectors = selectors;
  }
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.selectors.errorClass);
  };

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.selectors.inputErrorClass);
    errorElement.classList.remove(this.selectors.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this.selectors.inputSelector));
    const buttonElement = formElement.querySelector(this.selectors.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    formElement.addEventListener('reset', () => {
      this._toggleButtonState(inputList, buttonElement);
    })
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement, selectors) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, selectors);
    } else {
      this._enableButton(buttonElement, selectors);
    }
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this.selectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this.selectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  setInitialFormState(popup) {
    const inputList = Array.from(popup.querySelectorAll(this.selectors.inputSelector));
    const submitButton = popup.querySelector(this.selectors.submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(popup, inputElement)
    })
    this._disableButton(submitButton);
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.selectors.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  };
}
