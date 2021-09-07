class PlayerInfo {
  static show(player, infos) {
    let content = [];
    infos.forEach(info => {
      content.push(createText(undefined, info, () => {}));
      content.push(document.createElement('br'));
    });
    document.body.appendChild(createUiPanel("playerInfo", "More Info: " + player.name, content));
  }
}
