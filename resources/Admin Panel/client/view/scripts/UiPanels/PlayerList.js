class PlayerList {
  static show(allPlayers, options) {
    let content = [];
    allPlayers.forEach(player => {
      content.push(createText(undefined, player.name + ' (' + player.dbId + ')', () => PlayerOptions.show(player, options), true))
      content.push(document.createElement('br'));
    });
    document.body.appendChild(createUiPanel("playerList", "Players", content));
  }
}
