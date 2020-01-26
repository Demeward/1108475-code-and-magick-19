'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');


var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц ', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var wizards = [
  {
    name: wizardNames[Math.floor(Math.random() * wizardNames.length)] + ' ' + wizardSurnames[Math.floor(Math.random() * wizardSurnames.length)],
    coatColor: 'rgb(241, 43, 107)',
    eyesColor: 'yellow'
  },
  {
    name: wizardNames[Math.floor(Math.random() * wizardNames.length)] + ' ' + wizardSurnames[Math.floor(Math.random() * wizardSurnames.length)],
    coatColor: 'rgb(56, 159, 117)',
    eyesColor: 'black'
  },
  {
    name: wizardNames[Math.floor(Math.random() * wizardNames.length)] + ' ' + wizardSurnames[Math.floor(Math.random() * wizardSurnames.length)],
    coatColor: 'rgb(0, 0, 0)',
    eyesColor: 'red'
  },
  {
    name: wizardNames[Math.floor(Math.random() * wizardNames.length)] + ' ' + wizardSurnames[Math.floor(Math.random() * wizardSurnames.length)],
    coatColor: 'rgb(215, 210, 55)',
    eyesColor: 'blue'
  }
];

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');

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
