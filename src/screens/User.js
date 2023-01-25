import React , {useState} from 'react';
import './styles/user.scss';
import socket from '../socket';
import {useNavigate} from 'react-router-dom';

function User() {
    const [name, setname] = useState('');
    const [usernameAlreadySelected , setusernameAlreadySelected ] = useState(false);
    const navigate = useNavigate();
  
// handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    setusernameAlreadySelected(true);
    socket.auth = {username : name};
  
    setname('');
    // connection
    socket.connect();
    
    // navigate to room
    navigate(`/room`);
  }
  
  return (
    <div className="container">
      <div className="form-container">
        <div className="form-body">
          <h2>ChitChat</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter you name here..." value={name} onChange={e => setname(e.target.value)}/>
            <button type="submit" className="btn btn">Join</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default User