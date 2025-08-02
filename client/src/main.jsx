
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Login from "./components/Login";
import Admin from "./components/admin";
import Transaction from "./components/Transaction";
import Unauthorized from "./components/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin/edit/:id",
    element: <App />,
    children: [
      {
        path: "/admin/edit/:id",
        element: (
          <PrivateRoute>
            <Record />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin/create",
    element: <App />,
    children: [
      {
        path: "/admin/create",
        element: (
          <PrivateRoute>
            <Record />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin/recordList",
    element: <App />,
    children: [
      {
        path: "/admin/recordList",
        element: (
          <PrivateRoute>
            <RecordList />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/transaction",
    element: <App />,
    children: [
      {
        path: "/transaction",
        element: (
          <PrivateRoute>
            <Transaction />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <App />,
    children: [
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
