import * as alt from 'alt';
import * as natives from 'natives';

const adminPanel = {
  isLoaded: false,
  isShowed: false,
  view: null,
  emit: (event, ...args) => { if (adminPanel.isLoaded) adminPanel.view.emit(event, ...args); },
  nametags: false,
  invisible: false,
  noclip: false,
  godmode: false
};

alt.onServer('reload:Admin Panel', init);
alt.on('connectionComplete', init);

function init() {
  adminPanel.view = new alt.WebView('http://resource/client/view/index.html');
  adminPanel.view.on('executeOption', (id, optionName, ...args) => alt.emitServer('Admin Panel:executeOption', id, optionName, ...args));
  adminPanel.view.on('getPlayers', (id, optionName) => alt.emitServer('Admin Panel:getPlayers'));
  adminPanel.view.on('VehicleSpawner:spawn', (model) => alt.emitServer('VehicleSpawner:Spawn', model));

  adminPanel.view.on('loaded', () => {
    adminPanel.isLoaded = true;
    alt.emitServer('Admin Panel:getOptions')
  });
  adminPanel.view.on('hide', () => {
    adminPanel.isShowed = false;
    adminPanel.view.unfocus();
    alt.showCursor(false);
    alt.toggleGameControls(true);
  });

  adminPanel.view.on('Nametags:toggle', () => {
    adminPanel.nametags = !adminPanel.nametags;
    alt.emit("Nametags:Config", adminPanel.nametags, false, true, 100);
  });

  adminPanel.view.on('Invisible:toggle', () => {
    adminPanel.invisible = !adminPanel.invisible;
    natives.setEntityVisible(alt.Player.local.scriptID, !adminPanel.invisible, false);
  });

  adminPanel.view.on('Noclip:toggle', () => {
    adminPanel.noclip = !adminPanel.noclip;
    alt.emit("Noclip:Config", adminPanel.noclip);
  });

  adminPanel.view.on('Godmode:toggle', () => {
    adminPanel.godmode = !adminPanel.godmode;
    natives.setEntityInvincible(alt.Player.local.scriptID, adminPanel.godmode);
  });

  adminPanel.view.on('Teleport:pos', (posString) =>
    natives.startPlayerTeleport(
      alt.Player.local.scriptID,
      parseFloat(posString.split(", ")[0]),
      parseFloat(posString.split(", ")[1]),
      parseFloat(posString.split(", ")[2]),
      0, true, true, true));

  adminPanel.view.on('Teleport:location', (location) => {

  });

  adminPanel.view.on('Teleport:waypoint', () => {
    if (!natives.isWaypointActive()) return alt.log('Waypoint not defined');

    const z = 10000;
    const { scriptID: player } = alt.Player.local;

    const waypoint = natives.getFirstBlipInfoId(8);
    const coords = natives.getBlipInfoIdCoord(waypoint);

    natives.freezeEntityPosition(player, true);
    natives.startPlayerTeleport(player, coords.x, coords.y, z, 0, true, true, true);

    const interval = alt.setInterval(() => {
      if (natives.hasPlayerTeleportFinished(player)) {
        const ground = natives.getEntityHeightAboveGround(player);

        natives.startPlayerTeleport(player, coords.x, coords.y, (z - ground) + 100, 0, true, true, true);
        natives.freezeEntityPosition(player, false);
        alt.clearInterval(interval);
      }
    }, 100);
  });
}

alt.on('keydown', (key) => {
  if (key === 'Y'.charCodeAt(0) && adminPanel.isLoaded) {
    if (adminPanel.isShowed) {
      adminPanel.view.emit('hide');
      adminPanel.isShowed = false;
      adminPanel.view.unfocus();
      alt.showCursor(false);
      alt.toggleGameControls(true);
    } else {
      alt.emitServer('Admin Panel:getOptions');
      adminPanel.view.emit('show');
      adminPanel.isShowed = true;
      adminPanel.view.focus();
      alt.showCursor(true);
      alt.toggleGameControls(false);
    }
  }
});

alt.onServer('Admin Panel:setOptions', (...args) => {
  if (args[0].length == 0) {
    adminPanel.isLoaded = false;
    adminPanel.view.emit('hide');
    adminPanel.view.unfocus();
    adminPanel.view = null;
    adminPanel.isShowed = false;
    alt.showCursor(false);
    alt.toggleGameControls(true);
  }
  adminPanel.emit('setOptions', ...args);
});

alt.onServer('Admin Panel:setPlayers', (...args) => adminPanel.emit('setPlayers', ...args));
alt.onServer('Admin Panel:setInfo', (...args) => adminPanel.emit('setInfo', ...args));
alt.onServer('Admin Panel:setPlayerLogs', (...args) => adminPanel.emit('setPlayerLogs', ...args));
alt.onServer('Admin Panel:setServerInfo', (...args) => adminPanel.view.emit('setServerInfo', ...args));
alt.onServer('Admin Panel:setServerLogs', (...args) => adminPanel.emit('setServerLogs', ...args));
alt.onServer('Admin Panel:setServerOptions', (...args) => adminPanel.emit('setServerOptions', ...args));

alt.onServer('VehicleSpawner:setPedIntoVehicle', async (vehicle) => {
  const player = alt.Player.local;
  await promisify(() => {
    if (player.vehicle) return true;
    natives.setPedIntoVehicle(player.scriptID, vehicle.scriptID, -1);
  });
});



function promisify(callback) {
  return new Promise((resolve, reject) => {
    let loader = alt.setInterval(() => {
      if (callback() == true) {
        resolve(true);
        alt.clearInterval(loader);
      }
    }, 80);
  });
}
