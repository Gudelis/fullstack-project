import { useState } from "react";
import { baseURL } from "../../common/common";

export const AdminForm = () => {
  const [client, setClient] = useState("");

  const handleChange = (event) => {
    const getKey = event.target.id;
    const getData = event.target.value;

    setClient({ ...client, [getKey]: getData });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });
      if (response.ok) {
        alert("Success");
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
      <p>Calendar</p>
      <input
        type="submit"
        value="Register new client"
        className="cursor-pointer font-semibold"
        onClick={handleSubmit}
      />
    </form>
  );
};
