import Server from './Server.mjs';
import * as alt from 'alt-server';

let server;
let tokenList = {};

alt.on('resourceStart', async () => {
  server = await new Server(3040);
  server.on("connect", (client, headers) => {
    client.on('generateToken', (action, args) => {
      let token = generateToken(32);
      tokenList[token] = { action: action, args: args };
      client.emit('useToken', token);
    });
  });
});

function generateToken(length) {
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}

alt.on('playerConnect', (player) => {
  let info = { ...tokenList[player.authToken] };
  if (!tokenList[player.authToken] && !player.authInfo)
    player.kick('Please do not use the ip address to connect.'); //info = { action: 'login', args: { username: 'Moni', password: '1234' } };
  delete (tokenList[player.authToken]);
  player.authInfo = info;
  if (info.action == "login")
    alt.emit('playerLogin', player, info.args.username, info.args.password);
  else if (info.action == "register")
    alt.emit('playerRegister', player, info.args.username, info.args.password, info.args.email);
});

alt.on('resourceStop', () => {

});