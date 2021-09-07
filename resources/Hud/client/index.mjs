import * as alt from 'alt';
import * as natives from 'natives';
import * as WebView from '/client/webview.mjs';

alt.on('resourceStart', () => {
  WebView.createWebView('Hud', true);
});

alt.on('everyTick', () => {
  natives.displayRadar(alt.Player.local.vehicle != null);
  natives.hideHudComponentThisFrame(HUDComponents.HUD);
  natives.hideHudComponentThisFrame(HUDComponents.CASH);
  natives.hideHudComponentThisFrame(HUDComponents.MP_CASH);
});

alt.on('playerDamage', (damage) => {
  let playerHealth = natives.getEntityHealth(alt.Player.local.scriptID);
  if(playerHealth != 0) playerHealth -= 100;
  if(playerHealth > 90)
	alt.emit('Hud:WebView:Emit', "showIcon", "life", 0);
  else if(playerHealth > 70)
	alt.emit('Hud:WebView:Emit', "showIcon", "life", 1);
  else if(playerHealth > 50)
	alt.emit('Hud:WebView:Emit', "showIcon", "life", 2);
  else if(playerHealth > 20)
	alt.emit('Hud:WebView:Emit', "showIcon", "life", 3);
});

alt.on("playerDeath", () => alt.emit('Hud:WebView:Emit', "showIcon", "death", 3));

const HUDComponents = {
  HUD: 0,
  WANTED_STARS: 1,
  WEAPON_ICON: 2,
  CASH: 3,
  MP_CASH: 4,
  MP_MESSAGE: 5,
  VEHICLE_NAME: 6,
  AREA_NAME: 7,
  VEHICLE_CLASS: 8,
  STREET_NAME: 9,
  HELP_TEXT: 10,
  FLOATING_HELP_TEXT_1: 11,
  FLOATING_HELP_TEXT_2: 12,
  CASH_CHANGE: 13,
  RETICLE: 14,
  SUBTITLE_TEXT: 15,
  RADIO_STATIONS: 16,
  SAVING_GAME: 17,
  GAME_STREAM: 18,
  WEAPON_WHEEL: 19,
  WEAPON_WHEEL_STATS: 20,
  MAX_COMPONENTS: 21,
  MAX_WEAPONS: 22,
  MAX_SCRIPTED_COMPONENTS: 141
}
