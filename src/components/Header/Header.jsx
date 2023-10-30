import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex justify-around my-10">
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </header>
  );
};
