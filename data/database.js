const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let database;
const initDb = (callback) => {
    MongoClient.connect(process.env.MONGODB_URL)
        .then(client => {
            database = client.db('project2');
            callback(null, database);
        })
        .catch(err => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};