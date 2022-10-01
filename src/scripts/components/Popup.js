import { pageElement } from '../utils/constants.js';

export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('pop-up_opened');
    pageElement.classList.add('page_type_hidden');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('pop-up_opened');
    pageElement.classList.remove('page_type_hidden');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('pop-up_opened') || event.target.classList.contains('pop-up__close')) {
        this.close();
      }
    });
  }
}

