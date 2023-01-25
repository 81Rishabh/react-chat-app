import React from 'react';
import '../screens/styles/main.scss'
import Button from './Button';


function Sidebar({ renderUsers, loggedInUser, setshowUsersSidebar }) {

  return (
    <div className="sidebar">
      <header>
        <h3 className="app-name">ChitChat</h3>
        <div className='right'>
          <div className="Logged_In_User">
            <p>{loggedInUser && loggedInUser.username}(You)</p>
          </div>
          <Button
            title="Group"
            svg={
              <svg width={20} height={20} fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <path d="M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            setshowUsersSidebar={setshowUsersSidebar}
          />
        </div>
      </header>
      <ul>
        {renderUsers()}
      </ul>
    </div>
  )
}

export default Sidebar