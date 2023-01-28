import { io } from "socket.io-client";

const socket = io('http://localhost:8080');

socket.on("connect_error", (err) => {
    console.log(err);
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;