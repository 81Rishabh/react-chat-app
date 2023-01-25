import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import User from './screens/User';
import Main from './screens/Main';
import ChatContainer from './compnents/ChatContainer';
import ErrorPage from './screens/ErrorPage'
// import PrivateRoute from './hoc/PrivateRoute';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<User />,
    },
    {
      path: "/room",
      element: <Main />,
      errorElement : <ErrorPage />,
      children: [
        {
          path: "/room",
          element: <ChatContainer />,
        },
      ],
    },

  ]);
  return <RouterProvider router={router} />
}
export default App;