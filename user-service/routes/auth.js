
const express = require("express");
const router = express.Router();

const users = [];

router.post("/register", async  (req, res) => {
  try {
    
  
  const { username, password } = req.body;
  console.log("hello");
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists." });
  }

  const newUser = { id: Date.now().toString(), username, password };
  users.push(newUser);

  return res.status(200).json({ message: "User registered successfully.", user: newUser });
} catch (error) {
  console.log(error)
      return res.status(500).json({ message: "erreur"  });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful.", user });
});

module.exports = router;
