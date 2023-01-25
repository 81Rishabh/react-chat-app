import React, { useEffect, useState, useMemo } from 'react'
import { useOutletContext, useLocation } from 'react-router-dom'
import decrypt from '../helper/decryption';
import socket from '../socket';
import Button from './Button';

function ChatContainer() {
  const [message, setmessage] = useState("");
  const [users, selectedId, setshow, show, isMessageRecieved] = useOutletContext();
  const loc = useLocation();
  const query = new URLSearchParams(loc.search);
  const { userId } = Object.fromEntries(query.entries());


  // find current user by id
  const user = useMemo(() => {
    return users && users.find(user => user.userId === userId)
  }, [users, userId]);



  // scroll to bottom when we send message
  useEffect(() => {
    let messageContainer = document.querySelector('.messages');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [selectedId, message, isMessageRecieved]);

  // handle submit
  function handleSubmit(e) {
    e.preventDefault();

    if (userId !== null) {
      // send message to selected user
      socket.emit('private-message', {
        content: message,
        to: userId
      });

      user.messages.push({
        content: message,
        from: socket.userID
      });
      //  clear input field
      setmessage("");
    }
  }

  // decrypt message
  const decryptedMesssage = (message) => {
    return decrypt(message.content, message.key);
  }


  const renderMessages = (messages) => {
    return messages && messages.map((msg, idx) => {
      if (socket.userID === msg.from) {
        return (
          <div className="my-message" key={idx}>
            <p className="message-wrapper right">{decryptedMesssage(msg)}</p>
          </div>
        )
      } else {
        return (
          <div className="recipient-message" key={idx}>
            <p className="message-wrapper left">{decryptedMesssage(msg)}</p>
          </div>
        )
      }
    }
    )
  }

  // handle sidebar transition show
  function handleSidebarTransition() {
    const sidebar = document.querySelector('.sidebar');
    if (!show) {
      sidebar.classList.add('show');
      sidebar.classList.remove('hide');
      setshow(true);
    }
    else {
      sidebar.classList.remove('show');
      sidebar.classList.add('hide');
      setshow(false);
    }
  }

  return (
    <div className="chat-container">
      <header>
        <div className="header-left">
          <h4 className="user_name">{user && user.username}</h4>
          <p className="user-status">{user && (user.isOnline ? 'online' : 'offline')}</p>
        </div>
        <div className="header-right" onClick={handleSidebarTransition}>
          <Button
            svg={
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path>
              </svg>
            }
            title="Users"
          />
        </div>
      </header>
      <section className="message-container">
        <div className="messages">
          {
            user && renderMessages(user.messages)
          }
        </div>
        <footer>
          <div className="input-wrapper">
            <form type="submit" onSubmit={handleSubmit}>
              <div className='form-left'>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter message here..."
                  onChange={(e) => setmessage(e.target.value)}
                  value={message}
                />
              </div>
              <div className="form-right">
                {<div className="icon">
                  <svg className="clip" width="23" height="23" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m15.172 7-6.586 6.586a2 2 0 1 0 2.828 2.828l6.414-6.586a4 4 0 0 0-5.656-5.656l-6.415 6.585a6 6 0 1 0 8.486 8.486L20.5 13"></path>
                  </svg>
                </div>}
                <button type="submit" className="btn-submit" onSubmit={handleSubmit}>
                  <span>send</span>
                  <svg width={20} height={20} fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.243 12.437a.5.5 0 0 0 0-.874l-2.282-1.268A75.497 75.497 0 0 0 4.813 4.231l-.665-.208A.5.5 0 0 0 3.5 4.5v5.75a.5.5 0 0 0 .474.5l1.01.053a44.41 44.41 0 0 1 7.314.998l.238.053c.053.011.076.033.089.05a.163.163 0 0 1 .029.096c0 .04-.013.074-.029.096-.013.017-.036.039-.089.05l-.238.053a44.509 44.509 0 0 1-7.315.999l-1.01.053a.5.5 0 0 0-.473.499v5.75a.5.5 0 0 0 .65.477l.664-.208a75.499 75.499 0 0 0 14.146-6.064l2.283-1.268Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </footer>
      </section>
    </div>
  )
}

export default ChatContainer