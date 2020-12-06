export const SHAKE_ANIMATION_TIMEOUT = 600;

export const KeyCode = {
  ENTER: 13,
  ESC: 27
};

export const ROUGHNESS = {
  STEEL: 0.01,
  POLY: 0.002
};

export const RESIST_COEFS = [25, 20, 450, 300, 120, 50];

export const DIAMETERS = {
  STEEL: {
    '21.3x2.8': 1.57,
    '26.8x2.8': 2.12,
    '33.5x3.2': 2.71,
    '38x3': 3.2,
    '42.3x3.2': 3.59,
    '45x3': 3.9,
    '48x3.5': 4.1,
    '57x3': 5.1,
    '76x3': 7,
    '89x3': 8.3,
    '108x3': 10.2,
    '133x4': 12.5,
    '159x4.5': 15,
    '219x5': 20.9,
    '273x5': 26.3,
    '325x5': 31.5,
    '426x6': 41.4
  },
  POLY: {
    '40x3.7': 3.26,
    '50x2.9': 4.42,
    '63x3.6': 5.58,
    '75x4.3': 6.64,
    '90x5.2': 7.96,
    '110x6.3': 9.74,
    '125x7.1': 11.08,
    '140x8': 12.4,
    '160x9.1': 14.18,
    '180x10.3': 15.94,
    '200x11.4': 17.72,
    '225x12.8': 19.94,
    '250x14.2': 22.16,
    '280x15.9': 24.82,
    '315x17.9': 27.92,
    '355x20.1': 31.48,
    '400x22.7': 35.46,
    '450x25.5': 39.9,
    '500x28.4': 44.32,
    '560x31.7': 49.66,
    '630x35.7': 55.86
  }
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
};

export const SECTION = {
  INTRO: `intro`,
  DATA: `income-data`,
  SEGMENTS: `income-segments`,
  RESULTS: `results`,
};

export const PipeType = {
  STEEL: `steel`,
  POLY: `poly`,
};

export const ErrorMessage = {
  VALUE_MISSING: `Введіть дані`,
  RANGE_OVERFLOW: `Значення не може бути більше `,
  RANGE_UNDERFLOW: `Значення не може бути менше `
};
