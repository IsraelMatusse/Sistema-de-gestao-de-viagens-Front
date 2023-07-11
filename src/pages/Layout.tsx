/* eslint-disable jsx-a11y/anchor-is-valid */
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Outlet } from "react-router";

const Layout = function () {

  return (
    <NavbarSidebarLayout>
      <Outlet />
    </NavbarSidebarLayout>
  );
};



export default Layout;
