import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const RootLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
