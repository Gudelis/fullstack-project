import { NavLink } from "react-router-dom";
import { local } from "../../common/common";

export const Header = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem("userID");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="flex justify-center gap-x-20 my-10">
        {!!local ? (
          <>
            <button onClick={clearLocalStorage} className="text-right">
              Log Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </header>
    </>
  );
};
