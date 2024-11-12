const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

app.use(express.json());

const posts = [
  { name: "cbit", message: "hello cbit" },
  { name: "mgit", message: "hello mgit" }
];

app.post('/', (req, res) => {
  const { name } = req.body;
  const token = jwt.sign({ name }, process.env.ACCESS_TOKEN);
  res.json({ token });
});

app.get('/login', (req, res) => {
  const token = req.headers.auth?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");

  try {
    const { name } = jwt.verify(token, process.env.ACCESS_TOKEN);
    const userPosts = posts.filter(post => post.name === name);
    res.json(userPosts.length ? userPosts.map(p => p.message) : "No messages found");
  } catch {
    res.status(403).send("Invalid token");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
