$ = (queryString) => document.querySelector(queryString);
keyboard = $('#keyboard');
addressInput = $('#addressInput');

let input,
    val = "";
    
// value change in keyboard
keyboard.addEventListener("superkeyboardchange", evt => {
  val = evt.detail.value;
  addressInput.setAttribute("value", val);  
});

//closed keyboard
keyboard.addEventListener("superkeyboarddismiss", node => {
  console.log(node.components);
});

//press enter
keyboard.addEventListener("superkeyboardinput", () => {

});

//if tapped on input field show keyboard
addressInput.addEventListener('click', () => {
  keyboard.setAttribute('super-keyboard', {show: true});
});

//if tapped on search button hide keyboard
$('#nftVRButton').addEventListener('click', () => {
  keyboard.setAttribute('super-keyboard', {show: false});
});

// default keyboard value
keyboard.setAttribute('super-keyboard', {value: val});
keyboard.setAttribute('super-keyboard', {show: true});