import { useState } from "react";
import { baseURL } from "../../common/common";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AdminForm = () => {
  const [client, setClient] = useState("");
  const [date, setDate] = useState(new Date());
  console.log(client);

  const handleChange = (event) => {
    const getKey = event.target.id;
    const getData = event.target.value;
    setClient({ ...client, [getKey]: getData });
  };

  const handleChangeDate = (selectedDate) => {
    setDate(selectedDate);
    setClient({ ...client, date: selectedDate.toLocaleString("lt-LT") });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });
      if (response.ok) {
        alert("Success");
        window.location.href = "/";
      } else {
        alert("Internal error");
      }
    } catch (error) {}
  };

  return (
    <form className="flex flex-col w-3/12 border p-1">
      <p className="text-center">Make an appointment</p>
      <label htmlFor="email">Name</label>
      <input
        type="text"
        id="name"
        className="border p-1"
        required
        onChange={handleChange}
      />
      <label htmlFor="email">Surname</label>
      <input
        type="text"
        id="surname"
        className="border p-1"
        required
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className="border p-1"
        required
        onChange={handleChange}
      />

      <DatePicker
        selected={date}
        onChange={handleChangeDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        value="Open calendar"
        timeCaption="Hour"
        minTime={new Date().setHours(8, 0, 0)}
        maxTime={new Date().setHours(17, 0, 0)}
        className="text-red-500 font-semibold w-full border p-1 mt-2 text-center"
      />
      <p className="text-center">
        Selected date: {date.toLocaleString("lt-LT").slice(0, 16)}
      </p>
      <input
        type="submit"
        value="Register new client"
        className="cursor-pointer font-semibold mt-3 "
        onClick={handleSubmit}
      />
    </form>
  );
};
