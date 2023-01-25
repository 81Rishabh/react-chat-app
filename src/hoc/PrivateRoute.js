import { Navigate} from "react-router-dom";

function PrivateRoute({children}) {
  let sessionId = localStorage.getItem('sessionID');
  return sessionId === null ?  <Navigate to="/room" /> : children;
  
}

export default PrivateRoute;