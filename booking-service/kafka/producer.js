const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "booking-service",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

const sendBookingEvent = async (booking) => {
  await producer.connect();
  await producer.send({
    topic: "booking-topic",
    messages: [
      {
        value: JSON.stringify(booking)
      }
    ]
  });
  await producer.disconnect();
};

module.exports = { sendBookingEvent };
