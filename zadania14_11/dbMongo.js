
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@webowe.n2u1qcc.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client 