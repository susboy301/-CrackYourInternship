const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
require('dotenv').config();

const posts = [
    {
        "name": "cbit",
        "message": "hello cbit"
    },
    {
        "name": "mgit",
        "message": "hello mgit"
    }
];

app.post('/', (req, res) => {
    const username = req.body.name;
    const accessToken = jwt.sign({ name: username }, process.env.ACCESS_TOKEN);
    res.json({ "accessToken": accessToken });
});

app.get('/login', (req, res) => {
    const authHeader = req.headers.auth;    
    if (!authHeader) {
        return res.status(401).send("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN);
        const matchingPosts = posts.filter(post => post.name === verified.name);
        if (matchingPosts.length > 0) {
            res.json({ messages: matchingPosts.map(post => post.message) });
        } else {
            res.status(404).send("Name not found");
        }
    } catch (error) {
        res.status(403).send("Invalid token");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});