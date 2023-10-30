import { useRef, useState } from "react";

export const RegistrationForm = () => {
  const emailRef = useRef();

  const [registrationData, setRegistrationData] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    paswordCheck: "",
  });

  const handleChange = (event) => {
    const picker = event.target.id;
    const pickedData = event.target.value;

    setRegistrationData({ ...registrationData, [picker]: pickedData });
    console.log(registrationData.password);
    console.log(registrationData.paswordCheck);
  };

  // const handleSubmit = (event) => {
  //   // setRegistrationData({
  //   //   email: emailRef.value,
  //   // });
  //   // console.log(registrationData);
  // };

  return (
    <form className="flex flex-col justify-center align-items-center w-3/12 m-auto">
      <label htmlFor="email">E-Mail</label>
      <input
        type="text"
        id="email"
        // required
        className="border p-1"
        onChange={handleChange}
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
        // required
        className="border p-1"
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        // required
        className="border p-1"
        onChange={handleChange}
      />
      <label htmlFor="email">Re-enter password</label>
      <input
        type="password"
        id="paswordCheck"
        required
        className="border p-1"
        onChange={handleChange}
      />

      <input
        type="submit"
        id="submitRegistration"
        value="Register"
        // className="cursor-pointer" kodel neveikia???
        style={{ cursor: "pointer" }}
      />
    </form>
  );
};
