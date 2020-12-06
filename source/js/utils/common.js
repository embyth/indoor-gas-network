import {KeyCode} from '../const.js';

// Метод повертає випадковий індекс
export const getRandomIndex = (number) => {
  return Math.floor(Math.random() * number);
};

// Метод повертає випадкове число в заданому інтервалі
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Метод повертає випадкове число в заданому інтервалі
export const getRandomFloatNumber = (min, max, fix) => {
  return ((Math.random() * (max - min)) + min).toFixed(fix);
};

// Метод повертає випадкове значення в заданому масиві
export const getRandomValue = (array) => {
  return array[getRandomIndex(array.length)];
};

// Блокуємо прокрутку сторінки
export const blockBodyScroll = () => {
  document.body.style.overflowY = `hidden`;
};

// Розблокуємо прокрутку сторінки
export const unblockBodyScroll = () => {
  document.body.style.overflowY = `auto`;
};

// Перевірка на натиснення кнопки ESC
export const isEscKey = (evt) => {
  return evt.keyCode === KeyCode.ESC;
};

// Виділяємо поле вводу
export const highlightInput = (input) => {
  if (input.classList.contains(`data__input`)) {
    input.classList.add(`data__input--error`);
  } else {
    input.classList.add(`data__table-input--error`);
  }
};

// Знімаємо виділення поля вводу
export const resetHighlightInput = (input) => {
  if (input.classList.contains(`data__input`)) {
    input.classList.remove(`data__input--error`);
  } else {
    input.classList.remove(`data__table-input--error`);
  }
};
