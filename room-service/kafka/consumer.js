// kafka/consumer.js
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "room-service",
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "room-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "booking-created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const bookingData = JSON.parse(message.value.toString());
      console.log("[Room Service] New booking received:", bookingData);
      // Ici, tu peux ajouter une logique pour gérer les réservations côté room-service
    }
  });
};

run().catch(console.error);

module.exports = consumer;
