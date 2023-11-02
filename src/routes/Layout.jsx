import { Outlet, Link } from "react-router-dom";
import SideNav from "../components/SideNav";

const Layout = () => {
  return (
    <div>
      <nav>
       <SideNav />
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;