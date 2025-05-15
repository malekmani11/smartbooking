const startConsumer = require("./kafka/consumer");

console.log("NotificationService is listening for moderation results...");
startConsumer().catch(err => {
  console.error("❌ Failed to start consumer", err);
});
