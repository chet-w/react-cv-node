const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors);

server.get("/", (req, res) => {
    res.send("We live")
});

server.post("/send", (req, res) => {
    const payload = req.body;
    console.log(payload);
});

server.listen(4444, () => console.log("Server running on port 4444"));

