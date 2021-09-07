class PlayerLogs {
  static show(player, logs) {
    let content = [];
    logs.forEach(log => {
      content.push(createText(undefined, log, () => {}));
      content.push(document.createElement('br'));
    });
    document.body.appendChild(createUiPanel("playerLogs", "Player Logs: " + player.name, content));
  }
}
