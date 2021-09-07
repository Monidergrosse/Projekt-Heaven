function createContainer(name, content) {
  let container = document.createElement('div');
  container.className = name;
  content.forEach(element => container.appendChild(element));
  return container;
}

function createButton(name, text, click) {
  let button = document.createElement('button');
  button.innerHTML = text;
  button.addEventListener("mouseup", () => click());
  if(name != undefined)
    button.name = name;
  return button;
}

function createText(name, text, click, hover) {
  let span = document.createElement('span');
  span.innerHTML = text;
  span.addEventListener("mouseup", () => click());
  if(hover) span.className = "hoverText";
  if(name != undefined)
    span.setAttribute("name", name);
  return span;
}

function createDropdown(name, items, select) {
  let selectElement = document.createElement('select');
  items.forEach(item => {
    let option = document.createElement('option');
    option.innerHTML = item;
    selectElement.appendChild(option);
  });
  if(name != undefined)
    selectElement.name = name;
  return selectElement;
}

function createTextInput(name, text, input, enter) {
  let inputElement = document.createElement('input');
  inputElement.type = "text";
  inputElement.addEventListener("keyup", (event) => {
    if(input)
      input(inputElement.value);
    if (event.keyCode === 13) {
      event.preventDefault();
      if(enter)
        enter(inputElement.value);
    }
  });
  if(name != undefined)
    inputElement.name = name;
  if(text != undefined)
    inputElement.placeholder = text;
  return inputElement;
}

function createUiPanel(name, title, content, confirm) {

  let uiPanel = document.createElement('div');
  uiPanel.className = "uiPanel " + name;

  let headerPanel = document.createElement('div');
  let headerText = document.createElement('span');
  headerPanel.className = "header";
  headerText.innerHTML = title;
  headerPanel.appendChild(headerText);
  uiPanel.appendChild(headerPanel);

  let bodyPanel = document.createElement('div');
  let button = document.createElement('button');
  let contentElement = document.createElement('div');
  bodyPanel.className = "body";
  button.innerHTML = "Ok";
  button.className = "closePanle";
  button.addEventListener("mouseup", () => { uiPanel.parentElement.removeChild(uiPanel); if(confirm) confirm(); });
  contentElement.className = "bodyContent";
  content.forEach(element => contentElement.appendChild(element));
  bodyPanel.appendChild(contentElement);
  bodyPanel.appendChild(button)
  uiPanel.appendChild(bodyPanel);

  uiPanel.addEventListener("mousedown", (event) => { event.defaultPrevented = false; if(document.body.lastElementChild != uiPanel) document.body.appendChild(uiPanel); });
  makeElementDraggable(uiPanel, headerPanel);

  return uiPanel;

}

function makeElementDraggable(element, header) {

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (header)
    header.onmousedown = dragMouseDown;
  else
    element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    if(e.path[0].nodeName == "IMG")
      return;

    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;

    pos3 = e.clientX;
    pos4 = e.clientY;

    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
