import Popup from "./Popup.js";
import { popUpPicture, popUpText } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  open(name, link) {
    this._name = name;
    this._link = link;
    popUpPicture.setAttribute('src', this._link);
    popUpPicture.setAttribute('alt', this._name);
    popUpText.textContent = this._name;
    super.open();
  }
}
