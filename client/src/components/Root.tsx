import MyNav from "./MyNav";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <MyNav />
      <Outlet />
    </>
  );
}

export default Root;
