import { Server } from "socket.io";

export default async function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket",
  });

  res.socket.server.io = io;

  global.ONLINE_USERS = [];

  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      const remainedUsers = global.ONLINE_USERS.filter(
        (user) => user.socketId !== socket.id
      );
      socket.broadcast.emit("currentUsers", remainedUsers);
      global.ONLINE_USERS = remainedUsers;
    });
  });

  console.log("Setting up socket");
  res.end();
};
