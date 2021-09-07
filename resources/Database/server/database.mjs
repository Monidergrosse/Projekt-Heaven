import * as alt from 'alt';
import * as MongoDB from './mongodb.js';
const MongoClient = MongoDB.default.MongoClient;

export default class Database {
	connection;
	db;

	constructor(ip, db) {
		return new Promise(async (resolve, reject) => {
			this.connection = await MongoClient.connect(`mongodb://${ip}:27017`, {useUnifiedTopology: true});
			this.db = this.connection.db(db);
			resolve(this);
		});
	}

	async createOrGetCollection(collectionName) {
		if((await this.db.listCollections({name:collectionName}).toArray()).length == 0)
			await this.db.createCollection(collectionName);
		return await this.db.collection(collectionName);
	}

	close() {
		this.connection.close();
	}
}