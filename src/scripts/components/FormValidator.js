export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputlist = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputErrorList = Array.from(this._formElement.querySelectorAll(this._config.formErrorMessageSelector));
  }

  _showErrorMessage(inputElement) {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    error.classList.add(this._config.formErrorClass);
    error.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideErrorMessage(inputElement) {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    error.classList.remove(this._config.formErrorClass);
    error.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement);
    } else {
      this._hideErrorMessage(inputElement);
    }
  }

  _hasValidInput(inputlist) {
    return inputlist.some(input => {
      return !input.validity.valid
    })
  }

  _toggleButtonState() {
    if (this._hasValidInput(this._inputlist)) {
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.classList.add(this._config.submitButtonDisabledClass);
    } else {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._config.submitButtonDisabledClass);
    }
  }

  resetImputsErrorMessage() {
    this._toggleButtonState();
    this._inputErrorList.forEach(error => {
      error.classList.remove(this._config.formErrorClass);
    });
    this._inputlist.forEach(input => {
      input.classList.remove(this._config.inputErrorClass);
    });
  }

  _setEvenetListeners() {
    this._toggleButtonState();
    this._inputlist.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEvenetListeners();
  }
}
