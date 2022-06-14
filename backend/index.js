const express = require("express");
const morgan = require("morgan");

const { createUser, signIn, addPin, getPins, deletePin } = require("./handler");

express()
  .use(morgan("dev"))
  .use(express.json())
  .post("/api/createUser", createUser)
  .post("/api/signIn", signIn)
  .post("/api/addPin", addPin)
  .get("/api/getPins", getPins)
  .delete("/api/deletePin/:id", deletePin)

  .listen(8000, () => {
    console.log(" The backend server is running!");
  });
