const express = require("express");
const bodyParser = require("body-parser");
const { rooms, getRoomById } = require("./room");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 4002;

app.use(express.json());

app.get("/rooms", (req, res) => {
res.json([
    { id: 1, name: "Room 1" },
    { id: 2, name: "Room 2" }
  ]);});

app.get("/rooms/:id", (req, res) => {
  const room = getRoomById(req.params.id);
  if (room) res.json(room);
  else res.status(404).send("Room not found");
});

app.post("/rooms", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required." });
  }

  const newRoom = {
    id: uuidv4(),
    name,
    price
  };

  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

app.listen(PORT, () => {
  console.log(`Room service listening on port ${PORT}`);
});
