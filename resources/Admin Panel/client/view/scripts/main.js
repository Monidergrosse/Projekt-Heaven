window.addEventListener("load", () => {

  if ('alt' in window) {

    document.body.hidden = true;

    window.alt.emit('loaded');

    window.alt.on('show', () => document.body.hidden = false);
    window.alt.on('hide', () => document.body.hidden = true);

    window.alt.on('setOptions', (...args) => { if(document.getElementsByClassName("adminPanel")[0] == undefined) AdminPanel.show(...args); else AdminPanel.update(document.getElementsByClassName("adminPanel")[0], ...args); });
    window.alt.on('setPlayers', (...args) => PlayerList.show(...args));
    window.alt.on('setInfo', (...args) => PlayerInfo.show(...args));
    window.alt.on('setPlayerLogs', (...args) => PlayerLogs.show(...args));
    window.alt.on('setServerInfo', (...args) => ServerInfo.show(...args));
    window.alt.on('setServerLogs', (...args) => ServerLogs.show(...args));
    window.alt.on('setServerOptions', (...args) => ServerOptions.show(...args));

  }else {
    AdminPanel.show(["Players", "ServerInfo", "ServerLogs", "ServerOptions", "Teleport", "VehicleSpawner", "Weather", "Nametags", "Invisible", "Noclip", "Godmode"]);
  }
});
