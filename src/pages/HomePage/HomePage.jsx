import { useEffect, useState } from "react";
import { baseURL, local } from "../../common/common";
import { AdminForm } from "../../components/AdminForm/AdminForm";

export const HomePage = () => {
  const [allClients, setAllClients] = useState(null);

  useEffect(() => {
    const getClient = async () => {
      const response = await fetch(baseURL, {
        METHOD: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAllClients(data);
        console.log(data);
      }
    };

    getClient();
  }, []);

  const deleteUser = () => {};

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
                    <div>
                      {" "}
                      <p>
                        {client.name} {client.surname}
                      </p>
                      <p>{client.email}</p>
                    </div>
                    <div>
                      <button
                        className="h-full px-5 border bg-red-400"
                        onClick={deleteUser}
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
