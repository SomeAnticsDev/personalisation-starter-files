// Colour theme switcher, heavily inspired (but not as good as the original implementation) by Andy Bell's article: https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/
const STORAGE_KEY = 'p-colorScheme';
const themeButton = document.querySelector('.js-toggleThemeButton');
let currentSetting = localStorage.getItem(STORAGE_KEY);
let htmlElement = document.querySelector('html');

const loadSetting = () => {
  currentSetting = localStorage.getItem(STORAGE_KEY);
  console.log('cs ' + currentSetting);
  switch(currentSetting) {
  case null:
    currentSetting = getComputedStyle(htmlElement).getPropertyValue("--color-mode");
    console.log('cs ' + currentSetting);
    break;
  case 'light':
    currentSetting = 'light';
    break;
  case 'dark':
    currentSetting = 'dark';
    break;
  }
}

const toggleSetting = () => {
  let newSetting = localStorage.getItem(STORAGE_KEY);
  console.log(newSetting);
  switch(newSetting) {
  case 'light':
    newSetting = 'dark';
    break;
  case 'dark':
    newSetting = 'light';
    break;
  }
  console.log(newSetting);
  return newSetting;
}

const applySetting = passedSetting => {
  passedSetting = passedSetting.replace(/\'|"/g, '').trim();
  console.log(passedSetting);
  let oppositeSetting = '';
  switch (passedSetting) {
    case 'light':
      oppositeSetting = 'dark';
      break;
    case 'dark':
      oppositeSetting = 'light';
      break;
  }
  themeButton.textContent = `Change to ${oppositeSetting} theme`;
  console.log('ps ' + passedSetting);
  console.log('os ' + oppositeSetting);
  htmlElement.classList.remove(`p-${oppositeSetting}`);
  htmlElement.classList.add(`p-${passedSetting}`);
  localStorage.setItem(STORAGE_KEY, passedSetting);
}

loadSetting();
applySetting(currentSetting);

themeButton.addEventListener('click', e => {
  e.preventDefault();
  applySetting(toggleSetting());
});