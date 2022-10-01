import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, { handleSubmit }) {
    super(popupElement);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popupElement.querySelector('.button_type_submit');
    this._defaultSubmitButtonText = this._submitButton.textContent
  }

  _getInputValues() {
    this._inputsList = this._popupElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputsList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  resetForm() {
    this._form.reset();
  }

  setEventListeners() {
    this._form = this._popupElement.querySelector('.form');
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this.resetForm();
    super.close();
  }

  defaultSubmitButtonText(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._defaultSubmitButtonText
    }
  }

}
