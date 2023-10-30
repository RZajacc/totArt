import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Content from "./views/Content";
import Root from "./components/Root";
import { dataLoader } from "./utils/DataLoader";
import Contact from "./views/Contact";
import Account from "./views/Account";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
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
        {
          path: "dashboard",
          element: <Dashboard />,
          // loader: checkAuthLoader,
        },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
