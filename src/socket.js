import { io } from "socket.io-client";
const url = 'https://chit-chat-server-7pqo.onrender.com';

const socket = io('http://localhost:8080' , {autoConnect : false});

socket.on("connect_error", (err) => {
    console.log(err);
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;