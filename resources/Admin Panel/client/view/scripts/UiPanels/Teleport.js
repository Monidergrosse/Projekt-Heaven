class Teleport {
  static show() {
    let content = [];
    content.push(createTextInput("cordinaten", "Cordinaten", () => { }));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "Teleport", () => alt.emit("Teleport:pos", document.getElementsByName("cordinaten")[0].value)));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    content.push(createText(undefined, "Location: ", () => { }));
    content.push(createDropdown("location", ["Test"], () => { }));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "Teleport", () => alt.emit("Teleport:location", document.getElementsByName("location")[0].value)));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "Teleport to waypoint", () => alt.emit("Teleport:waypoint")));
    document.body.appendChild(createUiPanel("teleport", "Teleport", content))
  }
}
