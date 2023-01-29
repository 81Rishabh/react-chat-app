import { io } from "socket.io-client";
// const URL = 'https://chit-chat-server-7pqo.onrender.com';
const URL = 'http://localhost:8080';

const socket = io(URL , {
    autoConnect : false,
    transports : ['polling'],
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;