import * as alt from 'alt';
import fs from 'fs';
import path from 'path';

//const getDirectories = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
//const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms));
//let resources = getDirectories("./resources");
//alt.on('resourceStart', () => setTimeout(() => resources.forEach(resource => console.log(resource, alt.hasResource(resource))), 500));
let resources = [];
(async () => {
  let read = false;
  await fs.readFileSync("./server.cfg", 'utf8').split("\n").forEach(line => {
    if(line.trim().startsWith("#")) return;
    if(line == "]")
      read = false;
    if(read) {
      line = line.trim();
      resources.push(line);
    }
    if(line == "resources: [")
      read = true;
  });
})();

alt.on("consoleCommand", (command, ...resource) => {
  if(command.toLocaleLowerCase() != "reload") return;
  if(resource.length != 0) {
    if(resource.length == 1)
      reloadResource(resource[0]);
    else if(resource.length == 2)
      reloadResource(resource[0] + " " + resource[1]);
    else if(resource.length == 3)
      reloadResource(resource[0] + " " + resource[1] + " " + resource[2]);
  }
  else
    resources.forEach(res => reloadResource(res));
})

alt.on("consoleCommand", (command, ...resource) => {
  if(command.toLocaleLowerCase() != "list") return;
  console.log(["", ...resources].reduce((a, b) => a + " - " + b + "\n"));
})

function reloadResource(resource) {
  if(resource == "Debug") return;
  alt.restartResource(resource);
  alt.setTimeout(() => alt.emit("reload:" + resource), 1000);
  alt.setTimeout(() => alt.Player.all.forEach(player => alt.emitClient(player, "reload:" + resource)), 1000);
}

alt.on('playerConnect', (player) => {
  //player.spawn(403.2, -996.5, -99.0, 0);
  //player.model = 'mp_m_freemode_01';//mp_m_freemode_01
  //alt.setTimeout(() => player.rot = new alt.Vector3(Math.PI,0 , 0), 100);
});
