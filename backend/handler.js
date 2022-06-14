"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URL } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// singin
const signIn = async (req, res) => {
  const client = new MongoClient(MONGO_URL, options);
  const { name, password } = req.body;

  try {
    await client.connect();
    const db = client.db("pin");
    if (!name || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "Add your name and password" });
    }
    const loginAccount = await db.collection("users").findOne({ name });
    if (loginAccount) {
      const loginPassword = await bcrypt.compare(
        password,
        loginAccount.password
      );
      if (loginPassword) {
        const { _id, name } = loginAccount;

        return res.status(200).json({
          status: 200,
          message: "logged in ",
          data: { _id, name },
        });
      } else
        return res
          .status(409)
          .json({ status: 409, message: "Passwords don't match" });
    } else
      return res
        .status(400)
        .json({ status: 400, message: "username not found" });
  } catch (err) {
    console.log("error", err);
  } finally {
    client.close();
  }
};

// registrtion
const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URL, options);
  const { name, password, email } = req.body;
  const userArray = {
    _id: uuidv4(),
    name,
    password,
    email,
  };
  try {
    await client.connect();
    const db = client.db("pin");
    const user = await db.collection("users").findOne({ name });
    if (user) {
      return res
        .status(403)
        .json({ status: 403, message: "User already exists" });
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    userArray.password = cryptedPassword;
    const users = await db.collection("users").insertOne(userArray);
    return users
      ? res.status(200).json({
          status: 200,
          data: {
            _id: userArray._id,
            name,
            password,
            email,
          },
          message: "User Created",
        })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("error", err);
  } finally {
    client.close();
  }
};

//to add a pin
const addPin = async (req, res) => {
  const client = new MongoClient(MONGO_URL, options);
  const { name, title, desc, rating, lat, long, imgLink } = req.body;
  const pinPost = {
    name,
    title,
    desc,
    rating,
    lat,
    long,
    imgLink,
    timeStamp: new Date().getTime(),
  };
  try {
    await client.connect();
    const db = client.db("pin");
    const user = await db.collection("users").findOne({ name });
    if (!user) {
      return res.status(403).json({ status: 403, message: "Please Log In" });
    }
    const pinsUsers = await db.collection("pins").insertOne(pinPost);
    return pinsUsers
      ? res.status(200).json({
          status: 200,
          data: pinPost,

          message: "User Created",
        })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("error", err);
  } finally {
    client.close();
  }
};

// get all pins from database
const getPins = async (req, res) => {
  const client = new MongoClient(MONGO_URL, options);

  try {
    await client.connect();
    const db = client.db("pin");
    const pinsColletions = await db.collection("pins").find().toArray();
    return pinsColletions
      ? res
          .status(200)
          .json({ status: 200, data: pinsColletions, message: "pins recieved" })
      : res.status(409).json({ status: 409, message: "pins not recieved" });
  } catch (err) {
    console.log("error", err);
  } finally {
    client.close();
  }
};

const deletePin = async(req, res) =>{
  const client = new MongoClient(MONGO_URL, options);
  const {id} = req.params;
 
  try {
    await client.connect();
    const db = client.db("pin");
    // const user = await db.collection("users").findOne({id});
    const result = await db.collection("pins").deleteOne({_id:ObjectId(id)});
        result.acknowledged
      ? res.status(200).json({
          status: 200,
          data: result,

          message: "User deleted",
        })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("error", err);
  } finally {
    client.close();
  }

}

module.exports = { createUser, signIn, addPin, getPins, deletePin};
