class PlayerOptions {
  static show(player, options) {
    let content = [];
    content.push(createText(undefined, "ID: " + player.dbId, () => {}));
    content.push(document.createElement('br'));
    content.push(createText(undefined, "Ping: " + player.ping, () => {}));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    if(options.includes("MoreInfos")){
      content.push(createButton(undefined, "More Infos ...", () => { if ('alt' in window) alt.emit("executeOption", player.id, "PlayerInfo"); else PlayerInfo.show({name: player.name}, ["Infos"]); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Kick")){
      content.push(createButton(undefined, "Kick", () => Kick.show(player)));
      content.push(document.createElement('br'));
    }
    if(options.includes("Ban")){
      content.push(createButton(undefined, "Ban", () => Ban.show(player)));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Freeze")){
      content.push(createButton(undefined, "Freeze", () => alt.emit("executeOption", player.id, "Freeze")));
      content.push(document.createElement('br'));
      content.push(createButton(undefined, "Unfreeze", () => alt.emit("executeOption", player.id, "Unfreeze")));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Kill")){
      content.push(createButton(undefined, "Kill", () => alt.emit("executeOption", player.id, "Kill")));
      content.push(document.createElement('br'));
    }
    if(options.includes("Revive")){
      content.push(createButton(undefined, "Revive", () => alt.emit("executeOption", player.id, "Revive")));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Heal")){
      content.push(createButton(undefined, "Heal", () => alt.emit("executeOption", player.id, "Heal")));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("PlayerLogs")){
      content.push(createButton(undefined, "Spieler Logs", () => { if ('alt' in window) alt.emit("executeOption", player.id, "PlayerLogs"); else PlayerLogs.show(player, ["logs here", "..."]); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Specktate")){
      content.push(createButton(undefined, "Specktate", () => alt.emit("executeOption", player.id, "Specktate")));
      content.push(document.createElement('br'));
      content.push(createButton(undefined, "Stop Specktate", () => alt.emit("executeOption", player.id, "StopSpecktate")));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Teleport")){
      content.push(createButton(undefined, "Teleport", () => alt.emit("executeOption", player.id, "Teleport")));
      content.push(document.createElement('br'));
    }
    if(options.includes("TeleportToMe")){
      content.push(createButton(undefined, "Teleport To Me", () => alt.emit("executeOption", player.id, "TeleportToMe")));
      document.body.appendChild(createUiPanel("playerOptions", "Player: " + player.name, content));
    }
  }
}
