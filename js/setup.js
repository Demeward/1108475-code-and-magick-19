'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var MIN_NAME_LENGTH = 2;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var closePopupOnEsc = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', closePopupOnEsc);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', closePopupOnEsc);
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

var nameInput = document.querySelector('.setup-user-name');

nameInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

nameInput.addEventListener('invalid', function () {
  if (nameInput.validity.tooShort) {
    nameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity('Обязательное поле');
  } else {
    nameInput.setCustomValidity('');
  }
});

nameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
  } else {
    target.setCustomValidity('');
  }
});


var coatColor = document.querySelector('.setup-wizard .wizard-coat');
var eyesColor = document.querySelector('.setup-wizard .wizard-eyes');
var fireballColor = document.querySelector('.setup-fireball-wrap');
var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballColorInput = document.querySelector('input[name="fireball-color"]');

/**
 * Задаёт случайный цвет элементу мага
 * @param {*} element - Элемент мага
 * @param {Array} colors - Массив возможных цветов
 * @param {*} elementInput - Скрытое поле ввода цвета элемента для отправки на сервер
 */
var setRandomColor = function (element, colors, elementInput) {
  element.addEventListener('click', function () {
    var color = colors[getRandomElement(colors)];
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
    elementInput.value = color;
  });
};

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц ', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_AMOUNT = 4;

var wizardSetup = {
  WIZARD_NAMES: wizardNames,
  WIZARD_SURNAMES: wizardSurnames,
  COAT_COLORS: coatColors,
  EYES_COLORS: eyesColors,
  FIREBALL_COLORS: fireballColors
};

/**
 * Выбирает случаный элемент в массиве
 *
 * @param {Array} arr - Входной массив
 * @return {number} Случайный элемент массива
 */
var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

/**
 * Генерирует магов в виде массива объектов
 *
 * @return {Array} Массив магов
 */
var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_AMOUNT; i++) {
    wizards[i] = {
      name: wizardSetup.WIZARD_NAMES[getRandomElement(wizardSetup.WIZARD_NAMES)] + ' ' + wizardSetup.WIZARD_SURNAMES[getRandomElement(wizardSetup.WIZARD_SURNAMES)],
      coatColor: wizardSetup.COAT_COLORS[getRandomElement(wizardSetup.COAT_COLORS)],
      eyesColor: wizardSetup.EYES_COLORS[getRandomElement(wizardSetup.EYES_COLORS)]
    };
  }
  return wizards;
};

var wizards = generateWizards();


var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');

/**
 * Задаёт на странице разметку для мага на основе шаблона и объекта данных
 *
 * @param {Object} wizard - Объект с данными
 * @return {*} Разметка мага для вставки на страницу
*/
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
wizards.forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});
similarList.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

setRandomColor(coatColor, wizardSetup.COAT_COLORS, coatColorInput);
setRandomColor(eyesColor, wizardSetup.EYES_COLORS, eyesColorInput);
setRandomColor(fireballColor, wizardSetup.FIREBALL_COLORS, fireballColorInput);
