import { useState } from "react";
import { baseURL } from "../../common/common";
import { SubmitInput } from "../SubmitInput/SubmitInput";

export const RegistrationForm = () => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordState, setPasswordState] = useState(true);
  const [emailIsTaken, setEmailIsTaken] = useState(false);

  const [admin, setAdmin] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
  });
  const [adminValidation, setAdminValidation] = useState({
    name: true,
    surname: true,
    password: true,
    email: true,
  });

  const handleChange = (event) => {
    const getKey = event.target.id;
    const getData = event.target.value;
    setAdmin({ ...admin, [getKey]: getData });
  };

  const validateAdmin = (admin) => {
    const validName = admin.name && admin.name.length >= 1;
    const validSurname = admin.surname && admin.surname.length >= 1;
    const validPassword =
      admin.password === passwordCheck && admin.password >= 1;
    const validEmail =
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(admin.email) &&
      admin.email.length > 0;

    const isValid = validName && validSurname && validPassword && validEmail;

    setAdminValidation({
      name: validName,
      surname: validSurname,
      password: validPassword,
      email: validEmail,
    });

    if (!validPassword) {
      setPasswordState(false);
    } else {
      setPasswordState(true);
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const checkIfValid = validateAdmin(admin);

    if (checkIfValid) {
      try {
        const response = await fetch(`${baseURL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(admin),
        });
        if (response.ok) {
          setEmailIsTaken(false);
          alert("Registration was succesful, you can login now");
          window.location.href = "/login";
        } else if (response.status === 400) {
          setEmailIsTaken(true);
        } else {
          alert.log("Internal error, please try again later");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className=" flex flex-col justify-center align-items-center w-3/12 m-auto">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        required
        className={`border p-1 ${
          emailIsTaken && "border-red-500 focus:outline-red-500"
        } ${!adminValidation.email && "border-red-500 focus:outline-red-500"}`}
        onChange={handleChange}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        required
        className={`border p-1 ${
          !adminValidation.name && "border-red-500 focus:outline-red-500"
        }`}
        onChange={handleChange}
      />
      <label htmlFor="surname">Surname</label>
      <input
        type="text"
        id="surname"
        required
        className={`border p-1 ${
          !adminValidation.surname && "border-red-500 focus:outline-red-500"
        }`}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        required
        className={`border p-1 ${
          !passwordState && "border-red-500 focus:outline-red-500"
        }`}
        onChange={handleChange}
        autoComplete="new-password"
      />
      <label htmlFor="email">Re-enter password</label>
      <input
        type="password"
        id="passwordCheck"
        required
        className={`border p-1 ${
          !passwordState && "border-red-500 focus:outline-red-500"
        }`}
        onChange={(event) => setPasswordCheck(event.target.value)}
        autoComplete="new-password"
      />
      {Object.values(adminValidation).some((value) => !value) && (
        <p className="text-red-500 text-center mt-2">
          Some credentials are incorrect or missing
        </p>
      )}
      {emailIsTaken && (
        <p className="text-red-500 text-center mt-2">Email already taken</p>
      )}
      <SubmitInput submitValue="Register" onClick={handleSubmit} />
    </form>
  );
};
