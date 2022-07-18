$ = (queryString) => document.querySelector(queryString);

let input,
    val = "";
    
function handleKeyboardEvents(node) {
  node.addEventListener("superkeyboardchange", evt => {
    val = evt.detail.value;
    $('#keyboard').setAttribute('super-keyboard', {value: val});
    $('a-input').setAttribute('value', val);
  });
  node.addEventListener("superkeyboarddismiss", node => {
    console.log(node.components);
  });
  node.addEventListener("superkeyboardinput", () => {});
}
function handleInputClicked(node) {
  node.addEventListener("inputrequired", evt => {
    document.dispatchEvent(new Event("show"));
  });
}

//if tapped on input field show keyboard
$('a-input').addEventListener('click', () => {
  $('#keyboard').setAttribute('super-keyboard', {show: true});
});

//if tapped on search button hide keyboard
$('#nftVRButton').addEventListener('click', () => {
  $('#keyboard').setAttribute('super-keyboard', {show: false});
});

// default keyboard value
$('#keyboard').setAttribute('super-keyboard', {value: val});
$('#keyboard').setAttribute('super-keyboard', {show: false});