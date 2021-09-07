export default class DatabsePlayer {
  dbID;
  pdb;

  constructor(id, pdb) {
    this.dbID = id;
    this.pdb = pdb;
  }

  get id() {
    return this.dbID.toString();
  }

  get username() {
    return new Promise(async (resolve, reject) => {
      let player = await this.pdb.players.findOne({ _id: this.dbID });
      resolve(player.username);
    });
  }
  set username(username) {
    this.pdb.players.updateOne({ _id: this.dbID }, { $set: { username: username } });
  }

  get email() {
    return new Promise(async (resolve, reject) => {
      let player = await this.pdb.players.findOne({ _id: this.dbID });
      resolve(player.email);
    });
  }
  set email(email) {
    this.pdb.players.updateOne({ _id: this.dbID }, { $set: { email: email } });
  }

  get dcToken() {
    return new Promise(async (resolve, reject) => {
      let player = await this.pdb.players.findOne({ _id: this.dbID });
      resolve(player.dcToken);
    });
  }
  set dcToken(email) {
    this.pdb.players.updateOne({ _id: this.dbID }, { $set: { dcToken: dcToken } });
  }

  get tsToken() {
    return new Promise(async (resolve, reject) => {
      let player = await this.pdb.players.findOne({ _id: this.dbID });
      resolve(player.tsToken);
    });
  }
  set tsToken(tsToken) {
    this.pdb.players.updateOne({ _id: this.dbID }, { $set: { tsToken: tsToken } });
  }

  get hwidHash() {
    return new Promise(async (resolve, reject) => {
      let player = await this.pdb.players.findOne({ _id: this.dbID });
      resolve(Number.parseInt(player.hwidHash));
    });
  }
  set hwidHash(hwidHash) {
    this.pdb.players.updateOne({ _id: this.dbID }, { $set: { hwidHash: `${hwidHash}` } });
  }

  get characterIds() {
    return new Promise(async (resolve, reject) => {
      let player = await this.pdb.players.findOne({ _id: this.dbID });
      resolve(player.characterIds);
    });
  }
  set characterIds(characterIds) {
    this.pdb.players.updateOne({ _id: this.dbID }, { $set: { characterIds: characterIds } });
  }
  addCharacter(id) {
    let characterIds = this.characterIds;
    characterIds.push(id);
    this.characterIds = characterIds;
  }
  removeCharacter(id) {
    let characterIds = this.characterIds;
    characterIds.pop(id);
    this.characterIds = characterIds;
  }

  async delete() {
    await this.pdb.players.deleteOne({ _id: this.dbID });
  }
}