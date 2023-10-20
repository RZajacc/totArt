import MyNav from "./components/MyNav";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./views/Home";
import Content from "./views/Content";
import Contact from "./views/Contact";
import Account from "./views/Account";

function App() {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Root />}>
  //       <Route index element={<Home />} />
  //       <Route path="/content" element={<Content />} />
  //       <Route path="/contact" element={<Contact />} />
  //       <Route path="/account" element={<Account />} />
  //     </Route>
  //   )
  // );

  return <>{/* <RouterProvider router={router} /> */}</>;
}

// const Root = () => {
//   return (
//     <>
//       <MyNav />
//       <Outlet />
//     </>
//   );
// };

export default App;
