import * as alt from 'alt';
import * as native from 'natives';

alt.on('connectionComplete', () => {
  //alt.setModel('mp_f_freemode_01');
  //alt.setTimeout(() => native.setGameplayCamRelativeRotation(alt.Player.local.scriptID, 0, 0, 0), 100);
  //alt.Player.local.rot = Math.PI;
  //alt.requestModel(alt.hash("mp_f_freemode_01"));
  //native.setPlayerModel(alt.Player.local.scriptId, alt.hash("mp_f_freemode_01"));
});

alt.on('consoleCommand', (cmd, args) => {
  switch (cmd) {
    case "getPosition":
    case "getPos":
    case "gPos":
    case "gPosition":
      alt.log(`Position[x, y, z]: ${alt.Player.local.pos.x}, ${alt.Player.local.pos.y}, ${alt.Player.local.pos.z}`);
      break;
  }
});