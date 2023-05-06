import {
  createBrowserRouter,
  RouterProvider,
  //Router,
} from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Register } from "./pages/Register";
import { Single } from "./pages/Single";
import { Home } from "./pages/Home";
import { Write } from "./pages/Write";
import { Ready } from "./pages/Ready";
import { Footer } from "./com/Footer";
import { Tabbar } from "./com/Tabbar";
import "./style.scss";

const Layout = () => {
  return (
    <>
      <Tabbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/post/:id",
        element: <Single />
      },

      {
        path: "/write",
        element: <Write />
      },
    ]
  },

  {
    path: "/login",
    element: <Ready />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/home",
    element: <Home />,
  },

]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
