import { io } from "socket.io-client";
const URL = "https://chit-chat-server-7pqo.onrender.com";

const socket = io(URL , {autoConnect : false});

socket.onAny((event, ...args) => {
    console.log(event, args);
});
export default socket;