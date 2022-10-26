// Dependencies required to handle different Http methdods API routes
const express = require("express");
const path = require("path");
// Importing File System module
const fs = require("fs");
// importing Utilities module
const util = require("util");

// Handling Asynchronous processes - reads note and returns note for user, and in .json file
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Setting up Server
const app = express();
const PORT = process.env.PORT || 8000;

// This sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Static Middleware so the page can pick up statis files for front end
app.use(express.static("./Develop/public"));

// API Route - GET Request - gets notes and puts in an array
app.get("/api/notes", function(req, res) {
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

// API Route - POST Request  - posts and adds to existing array and writes back to db.json file
app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
        res.json(notes);
    })
});

// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// Listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});