getStyling();

function getStyling(){
  for (let x=0; x<localStorage.length; x++){
    const splitKey = localStorage.key(x).split('-');
    if (splitKey[0]==="p"){
      const storedValue = localStorage.getItem(localStorage.key(x));
      let splitValue = storedValue.split('--');
      changeStyling(splitValue[0], storedValue);
    }
  }
}

function changeStyling(classGroup, className){
  //store the body element and classes in variables
  const bodyElement = document.querySelector('html');
  const classes = bodyElement.classList;

  //loop through and see if there's any other classes of the same group in use
  for (let x=0; x<classes.length; x++){
    //if there is, remove them
    if (classes[x].includes(classGroup)){
      bodyElement.classList.remove(classes[x]);
      classes[x]="";
    }
  }

  //add this new class
  if (className!==""){
    bodyElement.classList.add(className);
  }
}

const stylingButtons = document.querySelectorAll('.js-changeStyling');

  for (let x=0; x<stylingButtons.length; x++) {
    stylingButtons[x].addEventListener('click', function(){
      const className = stylingButtons[x].dataset.property;
      const splitProperty = className.split('-');
      console.log("I work " + splitProperty[0]);
      changeStyling(splitProperty[0], className);
      //update storage
      saveStyling(splitProperty[0], className);
    });
  }

  function saveStyling(classGroup, className){
    localStorage.setItem('p-' + classGroup, className);
  }