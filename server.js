const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const knex = require("knex");
const bcrypt = require("bcryptjs");

const db = knex({
  client: "pg",
  version: "^8.3.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "r0ckmygam3",
    database: "document_management",
  },
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./documents/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("document");

const documents = require("./controllers/documents");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const compose = require("./controllers/compose");
const process = require("./controllers/process");
const outgoing = require("./controllers/outgoing");
const approval = require("./controllers/approval");

app.use(bodyParser.json());
app.use(cors());

// REGISTER A USER
app.post("/register", (req, res) =>
  register.handleRegister(req, res, bcrypt, db)
);
// SINGIN A USER
app.post("/signin", (req, res) => signin.handleSignin(req, res, bcrypt, db));

// COMPOSE DOCUMENT
app.post("/compose", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400).json(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(400).json(err);
    }
    // Everything went fine.
    compose.handleCompose(req, res, db);
  });
});

// PROCESS DOCUMENT
app.post("/processDoc", (req, res) => {
  process.handleProcessDocument(req, res, db);
});

// PROCESS DOCUMENT
app.post("/processDoc", (req, res) => {
  process.handleProcessDocument(req, res, db);
});

// outgoing document
app.post("/outgoing", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400).json(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(400).json(err);
    }
    // Everything went fine.
    outgoing.handleOutgoing(req, res, db);
  });
});
// get all documents
app.get("/documents", (req, res) => {
  documents.handleGetDocuments(req, res, db);
});

// approval of documents
app.post("/approval", (req, res) => {
  approval.handleApproval(req, res, db);
});

app.listen(5000, () => {
  console.log("LISTENING TO PORT 5000");
});
