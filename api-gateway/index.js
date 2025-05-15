const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { graphqlHTTP } = require("express-graphql");
const { schema, createResolvers } = require("./schema");

const app = express();
const PORT = 3000;
app.use(cors()); 

app.use("/api/users", createProxyMiddleware({
  target: "http://localhost:4001",
  changeOrigin: true,
  pathRewrite: { "^/api/users": "" }
}));

app.use("/api/rooms", createProxyMiddleware({
  target: "http://localhost:4002",
  changeOrigin: true,
  pathRewrite: { "^/api/rooms": "rooms" }
}));

app.use("/api/bookings", createProxyMiddleware({
  target: "http://localhost:4003",
  changeOrigin: true,
  pathRewrite: { "^/api/bookings": "/bookings" }
}));

// 🟣 gRPC + GraphQL Setup
const bookingProtoPath = path.join(__dirname, "../protos/booking.proto");
const packageDefinition = protoLoader.loadSync(bookingProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const bookingProto = grpc.loadPackageDefinition(packageDefinition).booking;
const grpcClient = new bookingProto.BookingService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const resolvers = createResolvers(grpcClient);
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

// ✅ Démarrage
app.listen(PORT, () => {
  console.log(`✅ API Gateway running on http://localhost:${PORT}`);
});
