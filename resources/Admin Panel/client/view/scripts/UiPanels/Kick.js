class Kick {
  static show(player) {
    let content = [];
    content.push(createText(undefined, "Message:", () => {}));
    content.push(document.createElement('br'));
    content.push(createTextInput(undefined, "You've been kicked from the server", () => {}, () => {}));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "Kick", () => alt.emit("executeOption", player.id, "Kick", content[2])));
    document.body.appendChild(createUiPanel("kick", "Kick: " + player.name, content));
  }
}
