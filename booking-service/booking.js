const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { Kafka } = require("kafkajs");

const app = express();
const PORT = 4003;

app.use(bodyParser.json());

const bookings = [];

app.post("/bookings", async (req, res) => {
  const { userId, roomId, date } = req.body;
  const newBooking = { id: uuidv4(), userId, roomId, date };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.get("/bookings", (req, res) => {
  res.status(200).json(bookings);
});

app.listen(PORT, () => {
  console.log(`Booking service listening on port ${PORT}`);
});
