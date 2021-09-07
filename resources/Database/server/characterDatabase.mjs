import DatabaseCharacter from "./databaseCharacter.mjs";
import * as MongoDB from './mongodb.js';
const ObjectId = MongoDB.default.ObjectId;

export default class CharacterDatabase {
  db;
  characters;

  constructor(db) {
    return new Promise(async (resolve, reject) => {
      this.db = db;
      this.characters = await db.createOrGetCollection("characters");
			resolve(this);
		});
  }

  async createCharacter(firstname, lastname, birthday, height, weight, gender) {
    let character = {firstname: firstname, lastname: lastname, birthday: birthday, height: height, weight: weight, gender: gender,
      food: 100, hydaration: 100, health: 100, stamina: 100, maxStamina: 100, strength: 1, position: {}, inventory: {}, memory: {waypoints: []},
      face: {shapeFirstID: 0, shapeSecondID: 0, shapeThirdID: 0, skinFirstID: 0, skinSecondID: 0, skinThirdID: 0, shapeMix: 0, skinMix: 0, thirdMix: 0, isParent: false},
      faceFeature: [], accessories: []};
    await this.characters.insertOne(character);
    let dbcharacter = new DatabaseCharacter(character._id, this);
    return dbcharacter;
  }

  async getCharacter(id) {
    console.log(id);
    let character = await this.characters.findOne({_id: new ObjectId(id)});
    console.log(character);
    if(!character) return null;
    let dbcharacter = new DatabaseCharacter(character._id, this);
    return dbcharacter;
  }
}