export default class DatabaseCharacter {
  dbID;
  cdb;

  constructor(id, cdb) {
    this.dbID = id;
    this.cdb = cdb;
  }

  //#region id
  get id() {
    return this.dbID.toString();
  }
  //#endregion
  //#region firstname
  get firstname() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.firstname);
		});
  }
  set firstname(firstname) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {firstname: firstname} });
  }
  //#endregion
  //#region lastname
  get lastname() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.lastname);
		});
  }
  set lastname(lastname) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {lastname: lastname} });
  }
  //#endregion
  //#region fullname
  get fullname() {
    return new Promise(async (resolve, reject) => {
      resolve(await this.firstname + " " + await this.lastname);
		});
  }
  //#endregion
  //#region birthday
  get birthday() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.birthday);
		});
  }
  set birthday(birthday) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {birthday: birthday} });
  }
  //#endregion
  //#region height
  get height() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.height);
		});
  }
  set height(height) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {height: height} });
  }
  //#endregion
  //#region weight
  get weight() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.weight);
		});
  }
  set weight(weight) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {weight: weight} });
  }
  //#endregion  
  //#region gender
  get gender() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.gender);
		});
  }
  set gender(gender) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {gender: gender} });
  }
  //#endregion  
  //#region food
  get food() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.food);
		});
  }
  set food(food) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {food: food} });
  }
  //#endregion  
  //#region hydaration
  get hydaration() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.hydaration);
		});
  }
  set hydaration(hydaration) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {hydaration: hydaration} });
  }
  //#endregion  
  //#region health
  get health() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.health);
		});
  }
  set health(health) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {health: health} });
  }
  //#endregion  
  //#region stamina
  get stamina() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.stamina);
		});
  }
  set stamina(stamina) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {stamina: stamina} });
  }
  //#endregion  
  //#region maxStamina
  get maxStamina() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.maxStamina);
		});
  }
  set maxStamina(maxStamina) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {maxStamina: maxStamina} });
  }
  //#endregion  
  //#region strength
  get strength() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.strength);
		});
  }
  set strength(strength) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {strength: strength} });
  }
  //#endregion  
  //#region position
  get position() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.position);
		});
  }
  set position(position) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {position: position} });
  }
  //#endregion  
  //#region inventory
  get inventory() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.inventory);
		});
  }
  set inventory(inventory) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {inventory: inventory} });
  }
  //#endregion  
  //#region memory
  get memory() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.memory);
		});
  }
  set memory(memory) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {memory: memory} });
  }
  //#endregion
  //#region face
  get face() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.face);
		});
  }
  set face(face) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {face: face} });
  }
  //#endregion
  //#region faceFeature
  get faceFeature() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.faceFeature);
		});
  }
  set faceFeature(faceFeature) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {faceFeature: faceFeature} });
  }
  //#endregion
  //#region accessories
  get accessories() {
    return new Promise(async (resolve, reject) => {
      let character = await this.cdb.characters.findOne({_id: this.dbID});
      resolve(character.accessories);
		});
  }
  set accessories(accessories) {
    this.cdb.characters.updateOne({_id: this.dbID}, { $set: {accessories: accessories} });
  }
  //#endregion
}