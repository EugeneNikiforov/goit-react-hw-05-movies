import { Outlet, NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styled from "./Layout.module.scss";

export default function Layout() {
  const activeBtn = ({ isActive }) =>
    isActive ? styled.active : styled.sliding_button;
  return (
    <div>
      <nav className={styled.navigation}>
        <NavLink to="/" className={activeBtn}>
          Home
        </NavLink>
        <NavLink to="/movies" className={activeBtn}>
          Movies
        </NavLink>
      </nav>
      <Outlet />
      <Toaster />
    </div>
  );
}