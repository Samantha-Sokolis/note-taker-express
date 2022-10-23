// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Handling Asynchronous processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Setting up Server
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Static Middleware
app.use(express.static("./develop/public"));

// API Route - GET Request
app.get("/api/notes", function(req, res) {
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

// API Route - POST Request
app.post("/api/notes", function(req, res) {
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        otes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(notes);
    })
});

// API Route - DELETE request
app.delete("/api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i = 0; i<notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.send('saved successfully');
    })
})

// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(_dirname, "./develope/public/index.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(_dirname, "./develope/public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(_dirname, "./develope/public/index.html"));
});

// Listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});