
const rooms = [
  { id: "1", name: "Chambre Deluxe", price: 120 },
  { id: "2", name: "Suite Présidentielle", price: 300 },
  { id: "3", name: "Chambre Simple", price: 80 },
];

const getRoomById = (id) => {
  return rooms.find((room) => room.id === id);
};

const listRooms = () => {
  return rooms;
};

module.exports = {
  getRoomById,
  listRooms,
};