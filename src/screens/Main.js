import React, { useEffect, useState, useCallback} from 'react';
import { Outlet, Link, useMatches } from "react-router-dom";
import socket from '../socket';
import Sidebar from '../compnents/Sidebar';
import UsersModal from '../compnents/UserModal';
import decrypt from '../helper/decryption';

function Main() {
    const [hasMessageRecieved, sethasMessageRecieved] = useState(true);
    const [selectedId, setselectedId] = useState(null);
    const [users, setusers] = useState([]);
    const [show, setshow] = useState(null);
    const [isMessageRecieved, setisMessageRecieved] = useState(false);
    const [showUsersSidebar, setshowUsersSidebar] = useState(false);
    const loggedInUser = users.find(user => user.userId === socket.userID);
    const match = useMatches();

    useEffect(() => {
        let Users;
        function SocketIO() {
            const sessionID = localStorage.getItem("sessionID");
            // check if connection is already established
            if (sessionID) {
                socket.auth = { sessionID };
                console.log("reconnect");
                // reconnect client
                socket.connect();
            }

            // get sesstion detail from server
            socket.on("session", ({ sessionID, userID }) => {
                //  attach the session ID to the next reconnection attempts
                socket.auth = { sessionID };

                // store it in the localstorage
                localStorage.setItem('sessionID', sessionID);

                // save the ID of the user
                socket.userID = userID;
            });

            socket.on("connect", () => {
                console.log('new user is joined... with id', socket.userID);
            });

            socket.on('users', connectedUser => {
                Users = [...connectedUser];

                // make logged in user on top
                let sortUsers = sortUser(Users, socket);

                // make itself user to online
                sortUsers.forEach((user) => {
                    if (user.self) {
                        user.isOnline = true;
                    }
                });
                setusers([...sortUsers]);
            });

            // get new connected user acknowladgement
            socket.on('user-connected', (NewUser) => {
                // // push new conntect user
                let user = Users.findIndex(user => user.userId === NewUser.userId);
                if (user < 0) { Users.push(NewUser) }
                let sortUsers = sortUser(Users, socket);
                setusers([...sortUsers]);
            });

            // get private-message
            socket.on('recipient-message', ({ content, from, to ,key}) => {
                
                setisMessageRecieved(!isMessageRecieved);
                // console.log(content);
                for (let i = 0; i < Users.length; i++) {
                    if (Users[i].userId === from) {
                        // user.prtotype.message = [];

                        const decrypt_message = decrypt(content , key);
                        Users[i].messages.push({
                            content : decrypt_message,
                            fromSelf: false,
                            to
                        });

                        if (Users[i].userId !== selectedId) {
                            Users[i].hasMessages = true
                        }
                        sethasMessageRecieved(true);
                        break;
                    }
                }
            });

            socket.on('user disconnected', (id) => {
                console.log("disconnected user", id);
            });

            // server disconnections
            socket.on("disconnect", () => {
                Users.forEach((user) => {
                    if (user.self) {
                        user.isOnline = false;
                    }
                });
                setusers([...Users]);
                console.log('chat server is disconnected...');
            });
        }
     
        SocketIO();
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('users');
            socket.off('session');
            socket.off('user-connected');
            socket.off('recipient-message');
        }

    }, [isMessageRecieved, selectedId]);


    // sort users 
    function sortUser(users, socket) {
        users.forEach((user) => {
            user.self = user.userId === socket.userID;
        });
        // put the current user first, and then sort by username
        let sortUser = users.sort((a, b) => {
            if (a.self) return -1;
            if (b.self) return 1;
            if (a.username < b.username) return -1;
            return a.username > b.username ? 1 : 0;
        });
        return sortUser;
    }


    useEffect(() => {
        if (hasMessageRecieved) {
            let updateUser = [...users];
            setusers([...updateUser]);
            sethasMessageRecieved(false);
        }
    }, [hasMessageRecieved, users]);

    const selectUser = (user, e) => {
        user.hasMessages = false;
        setselectedId(user.userId);
        sethasMessageRecieved(false);
        setshow(false)
    }


    const renderList = useCallback(() => {
        return users.length > 0 && users.map(user => {
            return user.userId !== socket.userID && 
                <Link key={user.userId} to={`${match[0].pathname}?userId=${user.userId}&isSelected=true`} className="user-link-item">
                    <li onClick={(e) => selectUser(user, e)}>
                        <div>
                            <p className="username">
                                <span>{user.username}</span>
                                <span className="nofication-badge" style={{ display: user.hasMessages ? 'block' : 'none' }}>new</span>
                            </p>
                            <p><span className="online-status-dot" style={{
                                background: user.isOnline ? 'rgb(10, 219, 10)' : 'red'
                            }}></span>{user.isOnline ? 'online' : 'offline'}</p>
                        </div>
                    </li>
                </Link>
        });
    },[users,match]);


    // render users list 
    let renderUsers = () => renderList();
   
    return (
        <main>
            <UsersModal
                users={users}
                currentUserId={socket.userID}
                showUsersSidebar={showUsersSidebar}
                setshowUsersSidebar={setshowUsersSidebar}
            />
            <Sidebar
                renderUsers={renderUsers}
                loggedInUser={loggedInUser}
                setshowUsersSidebar={setshowUsersSidebar}
            />
            <Outlet
                context={
                    [users, selectedId, setshow, show, isMessageRecieved]
                }
            />
        </main>
    )
}
export default Main;

