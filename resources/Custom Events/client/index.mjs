import * as alt from 'alt';
import * as natives from 'natives';

let lastPlayerHealth = 100;

alt.everyTick(() => {
  alt.emit("everyTick");
});

alt.setInterval(() => {
  let playerHealth = natives.getEntityHealth(alt.Player.local.scriptID);
  if(playerHealth != 0) playerHealth -= 100;
  if(lastPlayerHealth > playerHealth) {
  	let damage = lastPlayerHealth - playerHealth;
    if(playerHealth == 0)
  	 alt.emit("playerDeath");
    else
  	 alt.emit("playerDamage", damage);
  }
  lastPlayerHealth = playerHealth;
}, 0);
