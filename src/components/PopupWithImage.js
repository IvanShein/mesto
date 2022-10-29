import Popup from './Popup.js';
import { imageModal, imageModalTitle } from '../pages/index.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(element) {
    super.open()
    imageModal.src = element.link;
    imageModal.alt = element.name;
    imageModalTitle.textContent = element.name;
  };
};
