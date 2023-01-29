import { io } from "socket.io-client";

const socket = io('https://chit-chat-server-7pqo.onrender.com' , {autoConnect : false});

socket.on("connect_error", (err) => {
    console.log(err);
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;