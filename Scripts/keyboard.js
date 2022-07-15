$ = (queryString) => document.querySelector(queryString);

let input,
    val = "hello world";
  function handleKeyboardEvents(node) {
    node.addEventListener("superkeyboardchange", evt => {
      val = evt.detail.value;
      $('#keyboard').setAttribute('super-keyboard', {value: val});
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

  $('#keyboard').setAttribute('super-keyboard', {value: val});