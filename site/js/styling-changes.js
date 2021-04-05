
const personalisationOptions = document.querySelectorAll('.js-individualPersonalisation');

document.querySelectorAll('.js-individualPersonalisation').forEach(item => {
  item.addEventListener('click', e => {
    addIndividualStyling(e.target);
  })
})

const loadIndividualStyling = () => {
  for (let x=0; x<localStorage.length; x++){
    let splitKey = localStorage.key(x).split('-');
    if (splitKey[0]==="pi"){
      const storedValue = localStorage.getItem(localStorage.key(x));
      let splitValue = storedValue.split('--');
      let recreatedSelector = '';
      for (let y=1; y<splitKey.length-2; y++){
        recreatedSelector+=`${splitKey[y]}`;
        if (y!==splitKey.length-3){
          recreatedSelector+='-';
        }
      }
      addIndividualStyling('', recreatedSelector, storedValue);
    }
  }
}

loadIndividualStyling();

function addIndividualStyling(selectedItem, targetElementSelector, storedClassToAdd) {
  let elementToTarget, targetElement;
  if (!targetElementSelector){
    elementToTarget = selectedItem.closest('.c-atomicCustomisationMenu').dataset.personalisation;
    targetElement = document.querySelector(`.${elementToTarget}`);
  } else {
    elementToTarget = targetElementSelector;
    targetElement = document.querySelector(`.${elementToTarget}`);
  }

  let classToAdd;
  if (!storedClassToAdd) {
    classToAdd = selectedItem.dataset.property;
  } else {
    classToAdd = storedClassToAdd;
  }

  const existingClasses = targetElement.classList;

  
  let personalisationCategory = classToAdd.split('-');

  if ((!targetElementSelector) && (!storedClassToAdd)) {
    personalisationCategory = personalisationCategory[0];
  } else {
    personalisationCategory = personalisationCategory[1];
  }
  existingClasses.forEach(item => {
    if (item.includes(personalisationCategory)) {
      targetElement.classList.remove(item);
    }
  })
  if ((!targetElementSelector) && (!storedClassToAdd)) {
    targetElement.classList.add(`u-${classToAdd}`);
    saveIndividualStyling(elementToTarget, personalisationCategory, classToAdd);
  } else {
    targetElement.classList.add(`${classToAdd}`);
  }
}

function saveIndividualStyling(elementSelector, classGroup, className){
  localStorage.setItem('pi-' + elementSelector + '--' + classGroup, 'u-' + className);
}