import * as alt from 'alt-client';
import MugshotBoard from './Objects/MugshotBoard';
import Entity from './Utility/NativeObjectWrappers/Entity';

let player = new Entity(alt.Player.local.scriptID);
let mugshotBoard = new MugshotBoard(player);

alt.on('keydown', async (key) => {
  if (key == "G".charCodeAt(0)) {
    if (mugshotBoard.Active) {
      await mugshotBoard.stop();
    } else {
      await mugshotBoard.start("", "", "Test", "", -1);
    }
  }
});