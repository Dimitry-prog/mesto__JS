import { profileName, profileActivity, profileImg } from '../utils/constants.js';

export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._about = data.about;
    this._id = data.id;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    }
  }

  setUserInfo(name, about) {
    profileName.textContent = name;
    profileActivity.textContent = about;
  }

  setUserAvatar(avatar) {
    profileImg.src = avatar;
  }

  setMyId(id) {
    this._myId = id;
  }

  getMyId() {
    return this._myId;
  }
}
