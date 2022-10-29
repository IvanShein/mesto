export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);

  }

  getUserInfo() {
    this._formValues = {};
    this._formValues.name = this._name.textContent;
    this._formValues.job = this._job.textContent;
    return this._formValues;
  }

  setUserInfo(newName, newJob) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }

}

