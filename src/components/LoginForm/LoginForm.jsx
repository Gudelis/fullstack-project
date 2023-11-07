import { useState } from "react";
import { baseURL } from "../../common/common";
import { SubmitInput } from "../SubmitInput/SubmitInput";

export const LoginForm = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [checkLoginValid, setCheckLoginValid] = useState(true);

  const handleChange = (event) => {
    const getKey = event.target.id;
    const getData = event.target.value;
    setLogin({ ...login, [getKey]: getData });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const admin = await response.json();

      if (response.status === 200) {
        console.log(200);
        localStorage.setItem("userID", admin._id);
        window.location.href = "/";
      } else if (response.status === 401) {
        setCheckLoginValid(false);
        console.log(admin.error);
        console.log(checkLoginValid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col justify-center align-items-center w-3/12 m-auto">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className={`border p-1 ${
          !checkLoginValid && "border-red-500 focus:outline-red-500"
        }`}
        required
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        className={`border p-1 ${
          !checkLoginValid && "border-red-500 focus:outline-red-500"
        }`}
        required
        onChange={handleChange}
      />
      {!checkLoginValid && (
        <p className="text-red-500 text-center mt-2">
          Incorrect email or password
        </p>
      )}
      <SubmitInput submitValue="Login" onClick={handleSubmit} />
    </form>
  );
};
