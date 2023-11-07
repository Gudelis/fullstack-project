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
        <p className="text-center">
          To see available content, please register and login
        </p>
      ) : (
        <div className="flex justify-center">
          <AdminForm />
          <div className="w-2/5 ml-5 client-page">
            <p className=" p-4 text-lg">All open appointments:</p>
            {!!allClients &&
              allClients.map((client) => (
                <div key={client._id} className="mx-2">
                  <div className="border mb-2 flex justify-between client-page">
                    <div className="ml-3">
                      <p className="pt-2">
                        {client.name} {client.surname}, email: {client.email}
                      </p>
                      <p className="pb-2">
                        Visit at{" "}
                        {new Date(client.date).toLocaleString("lt-LT", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: false,
                        })}
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        className="h-3/4 mx-2 px-7 border bg-red-400 text-white"
                        onClick={() => deleteUser(client)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
