const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'class-db'
const dburl = `mongodb+srv://Raghav8197:QwErTy8197@cluster0.sk3se.mongodb.net/${dbName}`;
module.exports = {dburl,mongodb,MongoClient,dbName}