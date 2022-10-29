export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    this._formValues = {};
    this._formValues.name = this._nameSelector.textContent;
    this._formValues.job = this._jobSelector.textContent;
    return this._formValues;
  }

  setUserInfo(newName, newJob) {
    this._nameSelector.textContent = newName;
    this._jobSelector.textContent = newJob;
  }

}

