import * as alt from 'alt-server';

let server = {};
server.info = ["Name: MarbleState"];
server.logs = ["[23:44] Strated!", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "[23:45] Player connected", "Player connected", "Player connected", "Player connected"];
server.banedDbIds = [];

const options = {
  'ServerInfo': {
    execute: (sender) => alt.emitClient(sender, "Admin Panel:setServerInfo", server.info)
  },
  'ServerLogs': {
    execute: (sender) => alt.emitClient(sender, "Admin Panel:setServerLogs", server.logs)
  },
  'ServerOptions': {
    execute: (sender) => alt.emitClient(sender, "Admin Panel:setServerOptions", sender.serverOptions)
  },
  'PlayerInfo': {
    execute: (sender, player) => alt.emitClient(sender, "Admin Panel:setInfo", {name: player.name, id: player.id, dbId: player.dbId, ping: player.ping}, player.info)
  },
  'PlayerLogs': {
    execute: (sender, player) => alt.emitClient(sender, "Admin Panel:setPlayerLogs", {name: player.name, id: player.id, dbId: player.dbId, ping: player.ping}, player.logs)
  },
  'Kick': {
    execute: (sender, player, reason) => player.kick(reason)
  },
  'Ban': {
    execute: (sender, player, _message, _reason) => server.banedDbIds.push({name: player.name, message: _message, reason: _reason})
  },
  'Freeze': {
    execute: (sender, player) =>  { player.frozen = true; player.frozenPos = player.pos; }
  },
  'Unfreeze': {
    execute: (sender, player) => { player.frozen = false; player.frozenPos = undefined; }
  },
  'Kill': {
    execute: (sender, player) => player.health = 0
  },
  'Revive': {
    execute: (sender, player) => { player.health = player.maxHealth; player.spawn(player.pos.x, player.pos.y, player.pos.z, 1); }
  },
  'Heal': {
    execute: (sender, player) => player.health = player.maxHealth
  },
  'Specktate': {
    execute: (sender, player) => sender.specktating = player
  },
  'StopSpecktate': {
    execute: (sender, player) => sender.specktating = undefined
  },
  'Teleport': {
    execute: (sender, player) => sender.pos = player.pos
  },
  'TeleportToMe': {
    execute: (sender, player) => player.pos = sender.pos
  }
};

alt.on('playerConnect', (player) => {
  player.dbId = 0;
  player.options = ["Players", "ServerInfo", "ServerLogs", "ServerOptions", "Teleport", "VehicleSpawner", "Weather", "Nametags", "Invisible", "Noclip", "Godmode"];
  player.info = ["Infos"];
  player.logs = [];
  player.serverOptions = ["Stop", "Restart", "Reload"];
  player.playerOptions = ["MoreInfos", "Kick", "Ban", "Freeze", "Kill", "Revive", "Heal", "PlayerLogs", "Specktate", "Teleport", "TeleportToMe"];
  player.vehicles = [];
  player.vehicleLimit = 1;
  player.log = (log) => player.logs.push(`[${(("0" + new Date().getDate()).slice(-2) + "-" + ("0"+(new Date().getMonth()+1)).slice(-2) + "-" + new Date().getFullYear() + " " + ("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2) + ":" + ("0" + new Date().getSeconds()).slice(-2))}] ${log}`);

  player.setSyncedMeta('NAME', player.name + ' (' + player.dbId + ')');
  alt.emit('nametags:Config', player, false, false, true, 100);

  player.log("Connected");
});

alt.on('playerDisconnect', (player) => player.vehicles.forEach(vehicle => vehicle.destroy()));

alt.on('reload:Admin Panel', () => alt.Player.all.forEach(player => alt.emit('playerConnect', player)));

alt.onClient('Admin Panel:executeOption', (sender, id, optionName, ...args) => {
  if(id == -1)
    options[optionName].execute(sender, ...args);
  const player = alt.Player.all.find(player => player.id === id);
  if (player) options[optionName].execute(sender, player, ...args);
});

alt.onClient('Admin Panel:getOptions', (player) => alt.emitClient(player, 'Admin Panel:setOptions', player.options));
alt.onClient('Admin Panel:getOptions', (player) => player.log("Opened Admin Panel"));

alt.onClient('Admin Panel:getPlayers', (player) => alt.emitClient(player, 'Admin Panel:setPlayers', alt.Player.all.map(player => ({name: player.name, id: player.id, dbId: player.dbId, ping: player.ping})), player.playerOptions));

alt.onClient('VehicleSpawner:Spawn', (player, model) => {
  if (player.vehicles.length >= player.vehicleLimit) {
      player.vehicles[0].destroy();
      player.vehicles.splice(0, 1);
  }

  const vehicle = new alt.Vehicle(model, player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
  player.vehicles.push(vehicle);

  alt.emitClient(player, 'VehicleSpawner:setPedIntoVehicle', vehicle);
});

alt.setInterval(() => {
  alt.Player.all.forEach(player => {
    if(player.frozen)
      player.pos = player.frozenPos;
    if(player.specktating)
      player.pos = player.specktating.pos;
    if(server.banedDbIds.some(e => e.name === player.name))
      player.kick(server.banedDbIds.filter(e => e.name === player.name)[0].message + ". Reason:" + server.banedDbIds.filter(e => e.name === player.name)[0].reason); // TODO: linebraek
  });
}, 0);
