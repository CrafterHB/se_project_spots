const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_invalid",
  inputErrorClass: "modal__input_error",
};

const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorText = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorText.textContent = errorMessage;
};

const hideInputError = (formEl, inputEl, config) => {
  const errorText = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorText.textContent = "";
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl, config);
  } else {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    //Esentially doing a inputList[i] % 2 === 0
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (buttonEl, config = settings) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formEl, inputList, config = settings) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const button = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, button, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, button, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
