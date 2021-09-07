import DatabasePlayer from "./databasePlayer.mjs";
import * as bcrypt_nodejs from "bcrypt-nodejs";
const bcrypt = bcrypt_nodejs.default;

export default class PlayerDatabase {
  db;
  players;

  constructor(db) {
    return new Promise(async (resolve, reject) => {
      this.db = db;
      this.players = await db.createOrGetCollection("players");
      resolve(this);
    });
  }

  async registerPlayer(username, password, email, hwidHash) {
    let player = { username: username, password: bcrypt.hashSync(password, bcrypt.genSaltSync(12)), email: email, hwidHash: hwidHash, characterIds: [] };
    await this.players.insertOne(player);
    let dbplayer = new DatabasePlayer(player._id, this);
    return dbplayer;
  }

  async loginPlayer(username, password, hwidHash) {
    let player = await this.players.findOne({ username: username });
    if (!player) return new Error(`Username not fond.`);
    if (player.hwidHash != hwidHash) return Error(`HwidHash not correct. Your Id is: '${hwidHash}'. Expected: '${player.hwidHash}'.`);
    if (!await bcrypt.compareSync(password, player.password)) return Error(`Incorrect password.`);;
    let dbplayer = new DatabasePlayer(player._id, this);
    return dbplayer;
  }
}