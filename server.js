const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser=require("body-parser")
const cors=require("cors")


dotenv.config()
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
const app = express()
const port = 3000

app.use(bodyparser.json())
// app.use(cors())

app.use(cors({
  origin: "https://frontend-pass-op.vercel.app/"
}))

// Connection URL
const url = process.env.MONGO_URI
const client = new MongoClient(url);

// Database Name
const dbName = 'passOP';

// Use connect method to connect to the server
// await client.connect();
client.connect();

//get all the password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

//save the password
app.post('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password)
    // res.send(req.body);
    res.send({success:true,result:findResult})
  })
  
  //Delete a password
  app.delete('/', async (req, res) => {
  const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(password)
    res.json(findResult);
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})


// // index.js
// import 'dotenv/config';            // loads .env before anything else :contentReference[oaicite:1]{index=1}
// import express from 'express';
// import { MongoClient } from 'mongodb';

// const app = express();
// const port = 3000;

// // Connection URL and DB Name
// const url = process.env.MONGO_URI ?? 'mongodb://localhost:27017';
// const dbName = process.env.DB_NAME ?? 'passOP';
// const client = new MongoClient(url);

// // Connect once at top-level
// await client.connect();

// app.get('/', async (req, res) => {

//   const db = client.db(dbName);
//   const collection = db.collection('documents');
//   const docs = await collection.find({}).toArray();
//   res.json(docs);
// });

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });
