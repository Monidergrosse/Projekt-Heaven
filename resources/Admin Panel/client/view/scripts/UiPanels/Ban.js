class Ban {
  static show(player) {
    let content = [];
    content.push(createText(undefined, "Message:", () => {}));
    content.push(document.createElement('br'));
    content.push(createTextInput(undefined, "You've been baned from the server", () => {}, () => {}));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    content.push(createText(undefined, "Reason:", () => {}));
    content.push(document.createElement('br'));
    content.push(createTextInput(undefined, "", () => {}, () => alt.emit("executeOption", player.id, "Ban")));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "Ban", () => alt.emit("executeOption", player.id, "Ban", ((content[2].value == "") ? "You've been baned from the server" : content[7].value), ((content[0].value == "") ? "You've been baned from the server" : content[7].value))));
    document.body.appendChild(createUiPanel("ban", "Ban: " + player.name, content));
  }
}
