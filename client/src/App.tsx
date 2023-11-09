import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./views/ErrorPage";
import Content from "./views/Content";
import Root from "./components/Root";
import { dataLoader, detailsLoader } from "./utils/ContentLoaders";
import Contact from "./views/Contact";
import Account from "./views/Account";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ContentDetails from "./views/ContentDetails";

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
          path: "content/:id",
          element: (
            <ProtectedRoute>
              <ContentDetails />,
            </ProtectedRoute>
          ),
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
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
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
