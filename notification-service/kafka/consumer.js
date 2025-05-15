const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-client",
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "notification-group" });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "moderation-result", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const content = message.value.toString();
      console.log(`📩 Notification received from topic ${topic}: ${content}`);
    }
  });
};

module.exports = startConsumer;