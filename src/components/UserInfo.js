export default class UserInfo {
  constructor({profileNameSelector , profileJobSelector, profileAvatarSelector}) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(profileJobSelector);
    this._avatarElement = document.querySelector(profileAvatarSelector);
    this._name = '';
    this._job = '';
    this._avatar = '';
    this.id = '';
  };

  getUserInfo() {
    this._formValues = {};
    this._formValues.name = this._nameElement.textContent;
    this._formValues.job = this._jobElement.textContent;
    return this._formValues;
  };

  setUserInfo(newName, newJob, newId) {
    if (newName && newJob && newId) {
      this._name = newName;
      this._job = newJob;
      this.id = newId;
    }
  };

  setUserAvatar(newAvatarLink) {
    if (newAvatarLink) {
      this._avatar = newAvatarLink;
    }
  };

  renderUserData() {
    this._nameElement.textContent = this._name;
    this._jobElement.textContent = this._job ;
    this._avatarElement.src = this._avatar;
  }

}
