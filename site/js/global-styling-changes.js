// Adding event listeners to all globalPersonalisation options
document.querySelectorAll('.js-globalPersonalisation').forEach(item => {
  item.addEventListener('click', e => {
    addGlobalStyling(e.target);
  })
})

// addGlobalStyling adds classes to the HTML element causing style changes
// @param String selectedItem - Element that was selected by the user
// @param String storedClassToAdd - The class to be added to the HTML element
function addGlobalStyling(selectedItem, storedClassToAdd) {
  // Storing the HTML element for easy access
  const htmlElement = document.querySelector('html');
  let classToAdd;

  // Check to see if we've been passed a class to add already
  if (!storedClassToAdd) {
    // If not, grab it from the data attributes of the selected element
    classToAdd = selectedItem.dataset.classtoadd;
  } else {
    classToAdd = storedClassToAdd;
  }

  // Get the existing classes on the HTML element
  const existingClasses = htmlElement.classList;
  // Split up the class to add so we can see the category of the styling
  let personalisationCategory = classToAdd.split('-');

  // Depending on the class that we've been passed, the category may be in a different place
  if (!storedClassToAdd) {
    personalisationCategory = personalisationCategory[0];
  } else {
    personalisationCategory = personalisationCategory[1];
  }

  // Loop through the existing classes on the HTML element
  existingClasses.forEach(item => {
    // If one of the classes includes the category of the change we're making, we need to remove it
    if (item.includes(personalisationCategory)) {
      htmlElement.classList.remove(item);
    }
  })

  // If we haven't already been passed a class and we had to grab it from data attributes
  if (!storedClassToAdd) {
    // We need to store it in localStorage 
    saveGlobalStyling(personalisationCategory, classToAdd);
  }

  // Finally, add the class to the HTML element
  htmlElement.classList.add(`p-${classToAdd}`);
}

// saveGlobalStyling Just saves the item and it's information to localStorage
// @param String classGroup - The category of styling
// @param String className - The class to be added to the HTML element
function saveGlobalStyling(classGroup, className){
  localStorage.setItem('p-' + classGroup, className);
}

// loadGlobalStyling Grabs everything in localStorage and loads them if the item is a global personalisation
function loadGlobalStyling(){
  // Loops through everything in localStorage
  for (let x=0; x<localStorage.length; x++){
    const splitKey = localStorage.key(x).split('-');
    // Checks to see if the string was prefixed with p
    if (splitKey[0]==="p"){
      // If it is, then it's a global personalisation
      const storedValue = localStorage.getItem(localStorage.key(x));
      let splitValue = storedValue.split('--');
      // Add the global styling
      addGlobalStyling(splitValue[0], storedValue);
      // Make sure that the relevant radio input is selected
      toggleGlobalPersonalisationMenu(storedValue);
    }
  }
}

// Load the global personalisation items 
loadGlobalStyling();

// toggleGlobalPersonalisationMenu Ensures that the radio options for any loaded personalisations are checked
// @param String className - The class that's been added to the HTML element
function toggleGlobalPersonalisationMenu(className) {
  // Stores the global personalisation panel
  const personalisationOption = document.querySelector(`.b-globalPersonalisation`);

  // Check that we're not trying to set a light or dark theme as the heavily inspired Andy Bell theme-switcher.js file is managing this example
  if ((className!=='light')&&(className!=='dark')) {
    if (personalisationOption!==null) {
      // Finds the radio input and ensures that it's checked
      personalisationOption.querySelector(`input[data-classtoadd="${className}"]`).checked = true;
    }
  }
}