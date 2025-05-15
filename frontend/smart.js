document.getElementById("voirChambresBtn").addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/api/rooms");
  const rooms = await response.json();

  const output = document.getElementById("chambresResultat");
  output.innerHTML = "";

  rooms.forEach((room) => {
    const div = document.createElement("div");
    div.textContent = `🏨 ${room.name} - ${room.price} DT`;
    output.appendChild(div);
  });
});
