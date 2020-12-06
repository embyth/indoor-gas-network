import {KEY_CODES} from '../const.js';

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
  return evt.keyCode === KEY_CODES.ESC;
};
