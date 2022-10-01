import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import { validationConfig, popUpProfileForm, popUpCardForm, elementsList, popUpProfile, initialProfileInputsValue, profileEditButton, popUpCard, cardAddButton, popUpImg, nameInput, activityInput, avatarEditButton, popUpAvatar, popUpAvatarForm, popUpDelete, mainContent, loaderContent } from '../scripts/utils/constants.js';
import '../pages/index.css';
import PopupWithConfirmDelete from '../scripts/components/PopupWithConfirmDelete.js';

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
    'Content-Type': 'application/json'
  }
});

const renderLoader = (isLoading) => {
  if (isLoading) {
    mainContent.classList.add('content_hidden');
    loaderContent.classList.add('loader__content_visible');
  } else {
    mainContent.classList.remove('content_hidden');
    loaderContent.classList.remove('loader__content_visible');
  }
}

const validatorEditProfileForm = new FormValidator(validationConfig, popUpProfileForm);

const validatorAddCardForm = new FormValidator(validationConfig, popUpCardForm);

const imgPopup = new PopupWithImage(popUpImg);
imgPopup.setEventListeners();

const profileValues = new UserInfo(initialProfileInputsValue);

const createCard = (cardData) => {
  const cardElement = new Card({
    data: { ...cardData, myId: profileValues.getMyId() },
    handleCardClick: () => {
      imgPopup.open(data.name, data.link);
    },
    handleConfirmCardDelete: () => {
      deleteFormPopup.open();
      deleteFormPopup.setSubmitActive(() => {
        deleteFormPopup.defaultSubmitButtonText(true)
        api.deleteCard(cardElement.getCardId())
          .then(res => {
            cardElement.removeCard();
            deleteFormPopup.close();
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => deleteFormPopup.defaultSubmitButtonText(false));
      });
    },
    handlePutCardLike: () => {
      api.putLikeCard(cardElement.getCardId())
        .then(res => {
          cardElement.cardAddLike();
          cardElement.showQuantityCardLikes(res.likes.length);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemoveCardLike: () => {
      api.removeLikeCard(cardElement.getCardId())
        .then(res => {
          cardElement.cardDeleteLike();
          cardElement.showQuantityCardLikes(res.likes.length);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, '#template-card');
  return cardElement.generateCard();
}

const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item));
  }
}, elementsList);

/* PROFILE */

profileEditButton.addEventListener('click', function () {
  const { name, about } = profileValues.getUserInfo();
  nameInput.value = name.textContent;
  activityInput.value = about.textContent;
  validatorEditProfileForm.resetImputsErrorMessage();
  profileFormPopup.open();
});

const profileFormPopup = new PopupWithForm(popUpProfile, {
  handleSubmit: (formValues) => {
    profileFormPopup.defaultSubmitButtonText(true)

    api.patchProfile(formValues)
      .then(res => {
        const { name, about } = res;
        profileValues.setUserInfo(name, about);
        profileFormPopup.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => profileFormPopup.defaultSubmitButtonText(false));
  }
});
profileFormPopup.setEventListeners();

/* CARD */

cardAddButton.addEventListener('click', function () {
  validatorAddCardForm.resetImputsErrorMessage();
  addCardFormPopup.open();
  addCardFormPopup.resetForm();
});

const addCardFormPopup = new PopupWithForm(popUpCard, {
  handleSubmit: (values) => {
    addCardFormPopup.defaultSubmitButtonText(true)

    const { place, link } = values;
    const data = {
      name: place,
      link,
    }

    api.postNewCard(data)
      .then(res => {
        cardsContainer.addItemAtTheBeginning(createCard(res));
        addCardFormPopup.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => addCardFormPopup.defaultSubmitButtonText(false));
  }
});
addCardFormPopup.setEventListeners();

validatorEditProfileForm.enableValidation();
validatorAddCardForm.enableValidation();

/* AVATAR */

const validatorAvatarForm = new FormValidator(validationConfig, popUpAvatarForm);
validatorAvatarForm.enableValidation();

const avatarFormPopup = new PopupWithForm(popUpAvatar, {
  handleSubmit: ({ avatar }) => {
    avatarFormPopup.defaultSubmitButtonText(true);
    api.patchAvatar(avatar)
      .then(res => {
        const { avatar } = res;
        profileValues.setUserAvatar(avatar);
        avatarFormPopup.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => avatarFormPopup.defaultSubmitButtonText(false));
  }
});
avatarFormPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  validatorAvatarForm.resetImputsErrorMessage();
  avatarFormPopup.open();
});

/* CARD DELETE */

const deleteFormPopup = new PopupWithConfirmDelete(popUpDelete);
deleteFormPopup.setEventListeners();

/* INIT RENDER */

renderLoader(true)
api.getInitialAppState()
  .then(res => {
    const [userInfo, initCards] = res;

    const { name, about, avatar, _id } = userInfo;
    profileValues.setUserInfo(name, about);
    profileValues.setUserAvatar(avatar);
    profileValues.setMyId(_id);

    cardsContainer.renderItems(initCards);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => renderLoader(false));
