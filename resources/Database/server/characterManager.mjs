import * as alt from 'alt-server';

export default class CharacterManager {
  static async preloadCharacter(player) {
    console.log("model", await player.dbCharacter.gender, (await player.dbCharacter.gender) ? 'mp_f_freemode_01' : 'mp_m_freemode_01');
    player.model = (await player.dbCharacter.gender) ? 'mp_f_freemode_01' : 'mp_m_freemode_01';
    console.log("accessories", (await player.dbCharacter.accessories).map(accessory => JSON.stringify(accessory)).join(",\n"));
    (await player.dbCharacter.accessories).forEach(accessory => {
      if (accessory.dlc)
        player.setDlcClothes(alt.hash(accessory.dlc), accessory.component, accessory.drawable, accessory.texture, accessory.palette)
      else
        player.setClothes(accessory.component, accessory.drawable, accessory.texture, accessory.palette);
    });
  }

  static async loadCharacter(player) {
    console.log("model", await player.dbCharacter.gender, (await player.dbCharacter.gender) ? 'mp_f_freemode_01' : 'mp_m_freemode_01');
    player.model = (await player.dbCharacter.gender) ? 'mp_f_freemode_01' : 'mp_m_freemode_01';

    console.log("accessories", (await player.dbCharacter.accessories).map(accessory => JSON.stringify(accessory)).join(",\n"));
    (await player.dbCharacter.accessories).forEach(accessory => {
      if (accessory.dlc)
        player.setDlcClothes(alt.hash(accessory.dlc), accessory.component, accessory.drawable, accessory.texture, accessory.palette)
      else
        player.setClothes(accessory.component, accessory.drawable, accessory.texture, accessory.palette);
    });

    console.log("health", await player.dbCharacter.health);
    player.health = await player.dbCharacter.health;

    console.log("position", JSON.stringify(await player.dbCharacter.position));
    player.spawn(await player.dbCharacter.position.x, await player.dbCharacter.position.y, await player.dbCharacter.position.z, 0);
  }

  static async saveCharacter(player) {

  }
}