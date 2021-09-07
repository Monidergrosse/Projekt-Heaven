import * as alt from 'alt-server';
import Database from './database.mjs';
import PlayerDatabase from './playerDatabase.mjs';
import CharacterDatabase from './characterDatabase.mjs';
import CharacterManager from './characterManager.mjs';

alt.on('resourceStart', async () => {
  let db = await new Database("127.0.0.1", "DigitalislandRP");
  let playerDb = await new PlayerDatabase(db);
  let characterDb = await new CharacterDatabase(db);

  //console.log(await characterDb.getCharacter("602ff096f2b56792ecd3616d"))
  //let player = await playerDb.registerPlayer("Moni", "1234", "moni.dergrosse.net@gmail.com", 734241919694792000);
  //let player = await playerDb.loginPlayer("MickyKicky", "1234", 589238985);
  //await characterDb.createCharacter("Florian", "Winter", "15.12.1998", 185, 65, false);
  //let character = await characterDb.getCharacter();
  //console.log(await character.birthday);

  alt.on('playerLogin', async (player, username, password) => {
    player.login = { username: username, password: password };
    player.dbPlayer = await playerDb.loginPlayer(player.login.username, player.login.password, player.hwidHash);
    if (player.dbPlayer instanceof Error)
      player.kick(`Login failed! ${player.dbPlayer.message}`);
    alt.emitClient(player, 'SelectCharacter', await player.dbPlayer.characterIds);
  });

  alt.on('playerRegister', async (player, username, password, email) => {
    player.login = { username: username, password: password };
    player.dbPlayer = await playerDb.registerPlayer(username, password, email, player.hwidHash);
    if (player.dbPlayer instanceof Error)
      player.kick(`Registration failed! ${player.dbPlayer.message}`);
    alt.emitClient(player, 'SelectCharacter', await player.dbPlayer.characterIds);
  });

  alt.onClient('playerPreloadCharacter', async (player, characterID) => {
    if (!player.dbPlayer) return;
    player.dbCharacter = await characterDb.getCharacter(characterID);
    await CharacterManager.preloadCharacter(player);
  });

  alt.onClient('playerSelectedCharacter', async (player, characterID) => {
    if (!player.dbPlayer) return;
    if (player.dbCharacter)
      CharacterManager.saveCharacter(player);
    player.dbCharacter = await characterDb.getCharacter(characterID);
    await CharacterManager.loadCharacter(player);
  });

  alt.onClient('getDatabaseVariable', async (player, token, variable) => {
    let variableStack = variable.split('.');
    let value;
    switch (variableStack[0]) {
      case "player":

        break;
      case "character":
        console.log(player);
        console.log(player.dbCharacter);
        value = await player.dbCharacter[variableStack[1]];
        break;
    }
    alt.emitClient(player, 'setDatabaseVariable', token, value);
  });

  alt.on('playerDisconnect', async (player, reason) => {
    if (player.dbPlayer && player.dbCharacter)
      CharacterManager.saveCharacter(player);
  });

  alt.on('resourceStop', async () => {
    alt.Player.all.forEach(player => {
      if (player.dbPlayer && player.dbCharacter)
        CharacterManager.saveCharacter(player);
    });
    db.close();
  });
});
