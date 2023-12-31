import { useState } from "react";
import { baseURL } from "../../common/common";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AdminForm = () => {
  const [client, setClient] = useState({});
  const [date, setDate] = useState(new Date());
  const [appointmentDate, setappointmentDate] = useState(
    "Select appointment date"
  );
  const [clientValidation, setClientValidation] = useState({
    name: true,
    email: true,
    date: true,
  });

  const handleChange = (event) => {
    const getKey = event.target.id;
    const getData = event.target.value;
    setClient({
      ...client,
      [getKey]: getData.charAt(0).toUpperCase() + getData.slice(1),
    });
  };

  const handleChangeDate = (selectedDate) => {
    setDate(selectedDate);
    setappointmentDate(selectedDate);
    setClient({ ...client, date: selectedDate.toLocaleString("lt-LT") });
    validateClient(client);
  };

  const validateClient = (client) => {
    const validName = client.name && client.name.length >= 2;
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(client.email);
    const validDate = client.date && client.date.trim() !== "";

    const isValid = validName && validEmail && validDate;

    setClientValidation({
      name: validName,
      email: validEmail,
      date: validDate,
    });

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const checkIfValid = validateClient(client);

    if (checkIfValid) {
      try {
        const response = await fetch(`${baseURL}/clients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(client),
        });
        if (response.ok) {
          window.location.href = "/";
        } else {
          alert("Internal error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="flex flex-col w-1/5 border">
      <p className="text-lg mb-2">Create new appointment</p>
      <label htmlFor="email">Name</label>
      <input
        type="text"
        id="name"
        className={`border p-1 ${
          !clientValidation.name && "border-red-500 focus:outline-red-500"
        }`}
        required
        onChange={handleChange}
      />
      <label htmlFor="email">
        Surname <span className="text-xs">(optional)</span>
      </label>
      <input
        type="text"
        id="surname"
        className={`border p-1`}
        required
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className={`border p-1 ${
          !clientValidation.email && "border-red-500 focus:outline-red-500"
        }`}
        required
        onChange={handleChange}
      />

      <DatePicker
        selected={date}
        onChange={handleChangeDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        value={
          clientValidation.date
            ? appointmentDate.toLocaleString("lt-LT")
            : "Select a date"
        }
        timeCaption="Hour"
        minTime={new Date().setHours(8, 0, 0)}
        maxTime={new Date().setHours(16, 30, 0)}
        className={` font-semibold w-full text-center border p-1 my-2 ${
          !clientValidation.date &&
          "border-red-500 focus:outline-red-500 text-red-500"
        }`}
      />
      {Object.values(clientValidation).some((value) => !value) && (
        <p className="text-red-500 text-center mb-1">
          Fill in all required information
        </p>
      )}
      <input
        type="submit"
        value="Register new client"
        className="cursor-pointer font-semibold"
        onClick={handleSubmit}
      />
    </form>
  );
};
