import { NavLink } from "react-router-dom";
import { local } from "../../common/common";
import "./header.css";

export const Header = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem("userID");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="flex justify-center gap-x-5 py-10">
        {local ? (
          <>
            <button onClick={clearLocalStorage}>Log Out</button>
          </>
        ) : (
          <>
            <NavLink to="/register">Registration</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </header>
    </>
  );
};
