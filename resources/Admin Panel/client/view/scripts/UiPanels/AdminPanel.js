class AdminPanel {
  static show(options) {
    let content = [];
    if(options.includes("Players")){
      content.push(createButton(undefined, "Players", () => { if ('alt' in window) alt.emit("getPlayers"); else PlayerList.show([{name: "Test", id: 0, dbId: 0, ping: 0}], ["MoreInfos", "Kick", "Ban", "Freeze", "Kill", "Revive", "Heal", "PlayerLogs", "Specktate", "Teleport", "TeleportToMe"]); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("ServerInfo")){
      content.push(createButton(undefined, "Server Info", () => { if ('alt' in window) alt.emit("executeOption", -1, "ServerInfo"); else ServerInfo.show(["Name: MarbleState"]); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("ServerLogs")){
      content.push(createButton(undefined, "Server Logs", () => { if ('alt' in window) alt.emit("executeOption", -1, "ServerLogs"); else ServerLogs.show(["Strated!"]); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("ServerOptions")){
      content.push(createButton(undefined, "Server Options", () => { if ('alt' in window) alt.emit("executeOption", -1, "ServerOptions"); else ServerOptions.show(["Stop"]); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Teleport")){
      content.push(createButton(undefined, "Teleport", () => Teleport.show()));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("VehicleSpawner")){
      content.push(createButton(undefined, "Vehicle Spawner", () => VehicleSpawner.show()));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Weather")){
      content.push(createButton(undefined, "Weather", () => Weather.show()));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Nametags")){
      content.push(createButton(undefined, "Name Tags ON / OFF", () => { if ('alt' in window) alt.emit("Nametags:toggle"); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Invisible")){
      content.push(createButton(undefined, "Invisible ON / OFF", () => { if ('alt' in window) alt.emit("Invisible:toggle"); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Noclip")){
      content.push(createButton(undefined, "Noclip ON / OFF", () => { if ('alt' in window) alt.emit("Noclip:toggle"); }));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
    if(options.includes("Godmode")){
      content.push(createButton(undefined, "Godmode ON / OFF", () => { if ('alt' in window) alt.emit("Godmode:toggle"); }));
    }
    document.body.appendChild(createUiPanel("adminPanel", "Admin Panel", content, () => { alt.emit("hide"); document.body.innerHTML = ""; document.body.hidden = true; this.show(); }));
  }

  static update(element, options) {
    let content = document.getElementsByClassName("adminPanel")[0].getElementsByClassName("body")[0].getElementsByClassName("bodyContent")[0];
    Array.from(content.children).forEach((child) => child.remove());
    if(options.includes("Players")){
      content.appendChild(createButton(undefined, "Players", () => { if ('alt' in window) alt.emit("getPlayers"); else PlayerList.show([{name: "Test", id: 0, dbId: 0, ping: 0}], ["MoreInfos", "Kick", "Ban", "Freeze", "Kill", "Revive", "Heal", "PlayerLogs", "Specktate", "Teleport", "TeleportToMe"]); }));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("ServerInfo")){
      content.appendChild(createButton(undefined, "Server Info", () => { if ('alt' in window) alt.emit("executeOption", -1, "ServerInfo"); else ServerInfo.show(["Name: MarbleState"]); }));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("ServerLogs")){
      content.appendChild(createButton(undefined, "Server Logs", () => { if ('alt' in window) alt.emit("executeOption", -1, "ServerLogs"); else ServerLogs.show(["Strated!"]); }));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("ServerOptions")){
      content.appendChild(createButton(undefined, "Server Options", () => { if ('alt' in window) alt.emit("executeOption", -1, "ServerOptions"); else ServerOptions.show(["Stop"]); }));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("Teleport")){
      content.appendChild(createButton(undefined, "Teleport", () => Teleport.show()));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("VehicleSpawner")){
      content.appendChild(createButton(undefined, "Vehicle Spawner", () => VehicleSpawner.show()));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("Weather")){
      content.appendChild(createButton(undefined, "Weather", () => Weather.show()));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("Nametags")){
      content.appendChild(createButton(undefined, "Name Tags ON / OFF", () => { if ('alt' in window) alt.emit("Nametags:toggle"); }));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("Invisible")){
      content.appendChild(createButton(undefined, "Invisible ON / OFF", () => { if ('alt' in window) alt.emit("Invisible:toggle"); }));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("Noclip")){
      content.appendChild(createButton(undefined, "Noclip ON / OFF", () => { if ('alt' in window) alt.emit("Noclip:toggle"); }));
      content.appendChild(document.createElement('br'));
      content.appendChild(document.createElement('br'));
    }
    if(options.includes("Godmode")){
      content.appendChild(createButton(undefined, "Godmode ON / OFF", () => { if ('alt' in window) alt.emit("Godmode:toggle"); }));
    }
  }
}
