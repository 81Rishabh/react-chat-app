import { io } from "socket.io-client";

const socket = io(
    'http://localhost:8080',
     {
        autoConnect : false,
        transports: ["websocket", "polling"]
    }
 );

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;