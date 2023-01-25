import React, { useState } from 'react';
import CheckBox from "./CheckBox";


function UsersModal(props) {
  const { users, currentUserId, showUsersSidebar, setshowUsersSidebar } = props;
  const [selectedUser , setselectedUser] = useState([]);

  
  // handleSelectForGroup
  function handleSelectForGroup(ID , isSelected) {
    if(isSelected) {
       let newUser = {};
       // find user and store in selectedUser
       let user = users.find(user => user.userId === ID);
       newUser.username = user.username;
       newUser.userId = user.userId;
       setselectedUser(prev => [...prev , {...newUser}]);
    }
    else {
      //  find index
       let idx = selectedUser.findIndex(user => user.userId === ID);
      // remove selected user
       setselectedUser([...selectedUser.splice(idx , 1)]);
    }
  }
  

  return (
      <div className="user-modal" style={{
        position: 'absolute',
        top: '0',
        left: !showUsersSidebar ? '-500px' : '0',
      }}>
      <header>
        <div className="left">
          <h4>Users</h4>
        </div>
        <div className="Right">
          <svg onClick={() => setshowUsersSidebar(false)} style={{ cursor: "pointer" }} width="23" height="23" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
          </svg>
        </div>
      </header>
      <section id="users-lists">
        <div className="section-header">
          <input
           type="text"
           className="input-box"
           placeholder="Enter group name..."
         />
        </div>
        <ul>
          {
            users.length > 0 && users.map(user => {
              return user.userId !== currentUserId && (
                <li key={user.userId}>
                  <p className="username">
                    <span>{user.username}</span>
                    <span className="nofication-badge" style={{ display: user.hasMessages ? 'block' : 'none' }}>new</span>
                  </p>
                  <CheckBox
                      handleSelectForGroup={handleSelectForGroup}
                      id={user.userId}
                     
                     />
                </li>
              )
            })
          }
        </ul>
        <div className="section-footer">
          <button type="button" className="add-group-button">Create</button>
        </div>
      </section>
    </div>
  )
}

export default UsersModal;