import { useEffect, useState } from "react";
import { baseURL, local } from "../../common/common";
import { AdminForm } from "../../components/AdminForm/AdminForm";

export const HomePage = () => {
  const [allClients, setAllClients] = useState(null);

  useEffect(() => {
    const getClient = async () => {
      const response = await fetch(`${baseURL}/clients`, {
        METHOD: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAllClients(data);
      }
    };

    getClient();
  }, []);

  const deleteUser = async (client) => {
    try {
      await fetch(`${baseURL}/clients/${client._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    window.location.href = "/";
  };

  return (
    <>
      {!local ? (
        <p>To see available content, please login</p>
      ) : (
        <div className="flex justify-center">
          <AdminForm />
          <div className="w-7/12 ml-5">
            <p className="">All open appointments:</p>
            {!!allClients &&
              allClients.map((client) => (
                <>
                  <div
                    className="border p-1 mb-2 flex justify-between"
                    key={client._id}
                  >
                    <div className="ml-2">
                      <p>
                        {client.name} {client.surname}
                      </p>
                      <p>{client.email}</p>
                      <p>
                        <p>
                          {new Date(client.date).toLocaleString("lt-LT", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                              })}
                        </p>
                      </p>
                    </div>
                    <div>
                      <button
                        className="h-full px-10 border bg-red-400"
                        onClick={() => deleteUser(client)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
