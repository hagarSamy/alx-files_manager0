import { MongoClient } from 'mongodb';

class DBClient {
  // DBClient
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const db = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });  

    this.isConnected = false;
    this.client.connect()
      .then(() => {
        this.db = this.client.db(db);
        this.isConnected = true;
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
      });

  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    // returns the number of documents in the collection users
    const usersCollection = this.db.collection('users');
    return await usersCollection.countDocuments();
  }

  async nbFiles() {
    // returns the number of documents in the collection files
    const filesCollection = this.db.collection('files');
    return await filesCollection.countDocuments();
  }
}

const dbCli = new DBClient();
export default dbCli;
