export const closeOnClickOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};

export const closeOnEscKey = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  };
};

export const openPopup = (popupType) => {
  popupType.classList.add('popup_opened');
  document.addEventListener("keydown", closeOnEscKey);
  popupType.addEventListener("mousedown", closeOnClickOverlay);
};
