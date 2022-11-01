export default class FormValidator {
  constructor(validationConfig, validationElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._validationElement = validationElement;
    this._inputs = Array.from(this._validationElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._validationElement.querySelector(this._submitButtonSelector);
  };


  _showError(input) {
    const error = this._validationElement.querySelector(`.${input.id}-error`);
    error.classList.add(this._errorClass);
    error.classList.add(this.inputErrorClass);
    error.textContent = input.validationMessage;
  };

  _closeError(input) {
    const error = this._validationElement.querySelector(`.${input.id}-error`);
    error.classList.remove(this._errorClass);
    error.classList.remove(this.inputErrorClass);
    error.textContent = '';
  };


  _checkValidity(el) {

    if (!el.validity.valid) {
      this._showError(el)
    } else {
      this._closeError(el)
    };
  };


  _hasInvalid() {
    return this._inputs.some((input) => {
      return !input.validity.valid
    });
  };


  _setButtonStateSave() {
    if (this._hasInvalid()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    };
  };


  validityReset() {
    this._inputs.forEach((el) => {
      this._closeError(el);
    });
    this._setButtonStateSave();
  };


  enableValidation() {
    this._setButtonStateSave();
    this._inputs.forEach((el) => {
      el.addEventListener('input', () => {
        this._checkValidity(el);
        this._setButtonStateSave();
      });
    });
  };
};


