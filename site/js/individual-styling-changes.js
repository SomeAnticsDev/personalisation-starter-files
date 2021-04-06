
// Adding event listeners to all individualPersonalisation options
document.querySelectorAll('.js-individualPersonalisation').forEach(item => {
  item.addEventListener('click', e => {
    addIndividualStyling(e.target);
  })
})

// addIndividualStyling adds classes to the specifc element the user wishes to change
// @param String selectedItem - Element that was selected by the user
// @param String targetElementSelector - A passed selector for the element to target
// @param String storedClassToAdd - The class to be added to the specific element
function addIndividualStyling(selectedItem, targetElementSelector, storedClassToAdd) {
  let elementToTarget, targetElement;

  // Check to see if we've been passed a target selector already
  if (!targetElementSelector){
    // If not, we can grab it from the data attributes of the selected item's parent customisation menu
    elementToTarget = selectedItem.closest('.b-individualPersonalisationMenu').dataset.personalisation;
    targetElement = document.querySelector(`.${elementToTarget}`);
  } else {
    elementToTarget = targetElementSelector;
    targetElement = document.querySelector(`.${elementToTarget}`);
  }

  // Check to see whether that specific element exists, as it may not on certain pages
  if (targetElement!==null) {
    let classToAdd;
    // Check to see if we've been passed a class to add already
    if (!storedClassToAdd) {
      // If not, grab it from the data attributes of the selected element
      classToAdd = selectedItem.dataset.property;
    } else {
      classToAdd = storedClassToAdd;
    }
  
    // Get the existing classes on the target element
    const existingClasses = targetElement.classList;
    // Split up the class to add so we can see the category of the styling
    let personalisationCategory = classToAdd.split('-');
  
    // Depending on the class that we've been passed, the category may be in a different place
    if ((!targetElementSelector) && (!storedClassToAdd)) {
      personalisationCategory = personalisationCategory[0];
    } else {
      personalisationCategory = personalisationCategory[1];
    }

    // Loop through the existing classes on the target element
    existingClasses.forEach(item => {
      // If one of the classes includes the category of the change we're making, we need to remove it
      if (item.includes(personalisationCategory)) {
        targetElement.classList.remove(item);
      }
    })

    // Check if we were passed both the target selector and class to add
    if ((!targetElementSelector) && (!storedClassToAdd)) {
      // If we were not, we need to store it in localStorage
      saveIndividualStyling(elementToTarget, personalisationCategory, classToAdd);
      // Add the class
      targetElement.classList.add(`u-${classToAdd}`);
    } else {
      // Add the class
      targetElement.classList.add(`${classToAdd}`);
    }
  }
}

// saveIndividualStyling Saves the item and it's information to localStorage
// @param String elementSelector - A selector so that we can target the specific element again in the future
// @param String classGroup - The category of styling
// @param String className - The class to be added to the specific element
function saveIndividualStyling(elementSelector, classGroup, className){
  localStorage.setItem('pi-' + elementSelector + '--' + classGroup, 'u-' + className);
}

// loadGlobalStyling Grabs everything in localStorage and loads them if the item is a individual/specific personalisation
function loadIndividualStyling() {
  // Loops through everything in localStorage
  for (let x=0; x<localStorage.length; x++){
    let splitKey = localStorage.key(x).split('-');
    // Checks to see if the string was prefixed with pi
    if (splitKey[0]==="pi"){
      // If it is, then it's a individual/specific personalisation
      const storedValue = localStorage.getItem(localStorage.key(x));
      let splitValue = storedValue.split('--');
      let recreatedSelector = '';
      for (let y=1; y<splitKey.length-2; y++){
        recreatedSelector+=`${splitKey[y]}`;
        if (y!==splitKey.length-3){
          recreatedSelector+='-';
        }
      }
      // Add the styling
      addIndividualStyling('', recreatedSelector, storedValue);
      // Make sure that the relevant radio input is selected
      toggleIndividualPersonalisationMenu(recreatedSelector, storedValue);
    }
  }
}

// Load the individual personalisation items 
loadIndividualStyling();

// removeIndividualPersonalisation Removes any personalisations from an element
// @param String targetSelector - A selector so that we can target the specific element
function removeIndividualPersonalisation(targetSelector){
  // Loops through everything in localStorage
  for (let x=0; x<localStorage.length; x++){
    const storageKey = localStorage.key(x);
    // Checks to see whether anything includes the selector of the item we wish to remove styling for
    if (storageKey.includes(targetSelector)){
      // If it does, we get the item
      const storedValue = localStorage.getItem(localStorage.key(x));
      // Remove the class
      document.querySelector(`.${targetSelector}`).classList.remove(storedValue);
      // Clear that item from localStorage
      localStorage.setItem(localStorage.key(x), '');
    }
  }
}

// toggleIndividualPersonalisationMenu Ensures that the radio options for any loaded personalisations are checked
// @param String elementSelector - The selector used to target the element to change
// @param String className - The class that's been added to the specific element
function toggleIndividualPersonalisationMenu(elementSelector, className) {
  // Stores the individual personalisation panel
  const personalisationOption = document.querySelector(`.b-individualPersonalisationMenu[data-personalisation="${elementSelector}"]`);
  if (personalisationOption!==null) {
    // Finds the radio input and ensures that it's checked
    personalisationOption.querySelector(`input[data-property="${className.substring(2)}"]`).checked = true;
  }
}