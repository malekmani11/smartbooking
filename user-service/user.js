const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(4001, () => {
  console.log("User Service running on port 4001");
});
