import Popup from "./Popup";

export default class PopupWithConfirmDelete extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._submitButton = this._popupElement.querySelector('.button_type_submit');
    this._defaultSubmitButtonText = this._submitButton.textContent
  }

  setSubmitActive(callBack) {
    this._handleSubmit = callBack
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }

  defaultSubmitButtonText(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._defaultSubmitButtonText
    }
  }

}
