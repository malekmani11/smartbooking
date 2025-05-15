const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Booking {
    id: String
    userId: String
    roomId: String
    date: String
  }

  type Query {
    booking(id: String!): Booking
    getAllBookings: [Booking]
  }
`);

function createResolvers(grpcClient) {
  return {
    booking: ({ id }) => {
      return new Promise((resolve, reject) => {
        grpcClient.GetBooking({ id }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    },
    getAllBookings: () => {
      return new Promise((resolve, reject) => {
        grpcClient.ListBookings({}, (err, res) => {
          if (err) reject(err);
          else resolve(res.bookings); // Assure-toi que res contient bien un champ `bookings`
        });
      });
    }
  };
}

module.exports = {
  schema,
  createResolvers
};
