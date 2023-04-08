import { io, Socket } from "socket.io-client";

import { connect } from "socket.io-client";

const socket: Socket = io("http://localhost:8080", {
  transports: ["websocket"],
  auth: {
    token: "my-secret-token",
  },
});
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("message", (data) => {
  console.log(`Received message: ${data}`);
});

socket.emit("message", "Hello from client");
const MyComponent = () => {
  // ...
};
