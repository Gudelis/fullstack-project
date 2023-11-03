import { useState } from "react";
import { baseURL } from "../../common/common";

export const RegistrationForm = () => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [registrationData, setRegistrationData] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
  });

  const handleChange = (event) => {
    const getKey = event.target.id;
    const getData = event.target.value;

    setRegistrationData({ ...registrationData, [getKey]: getData });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (registrationData.password !== passwordCheck) {
      alert("password doesnt match");
    } else {
      try {
        const response = await fetch(`${baseURL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });
        if (response.ok) {
          alert("Registration was succesful");
          window.location.href = "/login";
        } else {
          alert("Internal error");
        }
      } catch (error) {}
    }
  };

  return (
    <form className="flex flex-col justify-center align-items-center w-3/12 m-auto">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        required
        className="border p-1"
        onChange={handleChange}
        autoComplete="new-email"
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        required
        className="border p-1"
        onChange={handleChange}
      />
      <label htmlFor="surname">Surname</label>
      <input
        type="text"
        id="surname"
        required
        className="border p-1"
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        required
        className="border p-1"
        onChange={handleChange}
        autoComplete="new-password"
      />
      <label htmlFor="email">Re-enter password</label>
      <input
        type="password"
        id="paswordCheck"
        required
        className="border p-1"
        onChange={(event) => setPasswordCheck(event.target.value)}
        autoComplete="new-password"
      />

      <input
        type="submit"
        id="submitRegistration"
        value="Register"
        className="mt-3 font-semibold cursor-pointer"
        onClick={handleSubmit}
      />
    </form>
  );
};
