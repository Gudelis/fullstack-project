import { useState } from "react";
import { baseURL } from "../../common/common";

export const LoginForm = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const getKey = event.target.id;
    const getData = event.target.value;
    setLogin({ ...login, [getKey]: getData });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const admin = await response.json();

    if (response.ok) {
      localStorage.setItem("userID", admin._id);
      window.location.href = "/";
    }
  };

  return (
    <form className="flex flex-col justify-center align-items-center w-3/12 m-auto">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className="border p-1"
        required
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        className="border p-1"
        required
        onChange={handleChange}
      />
      <input
        type="submit"
        className="mt-3 font-semibold cursor-pointer"
        value="Login"
        onClick={handleSubmit}
      />
    </form>
  );
};
