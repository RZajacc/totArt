import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Content from "./views/Content";
import Root from "./components/Root";
import { dataLoader } from "./utils/DataLoader";
import Contact from "./views/Contact";
import Account from "./views/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "content",
        loader: dataLoader,
        element: <Content />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
