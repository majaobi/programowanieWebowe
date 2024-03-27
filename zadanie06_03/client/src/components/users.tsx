import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
}

interface NewUser {
  email: string;
  name: string;
  password: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<NewUser>({
    email: "",
    name: "",
    password: "",
  });
  const [editUser, setEditUser] = useState<{ email: string; name: string }>({
    email: "",
    name: "",
  });
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get<User[]>("http://localhost:8080/users")
      .then((response) => setUsers(response.data))
      .catch((error) =>
        console.error("There was an error fetching the users:", error)
      );
  };

  const handleDeleteUser = (userId: string) => {
    axios
      .delete(`http://localhost:8080/users/${userId}`)
      .then(() => {
        fetchUsers(); // Refresh the list of users after a deletion
      })
      .catch((error) =>
        console.error("There was an error deleting the user:", error)
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users", newUser)
      .then(() => {
        setNewUser({ email: "", name: "", password: "" });
        return axios.get<User[]>("http://localhost:8080/users");
      })
      .then(() => {
        fetchUsers();
      })
      .catch((error) =>
        console.error("There was an error posting the user:", error)
      );
  };

  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    console.log(users);
    const matchedUserData = users.find((user) => user.id === e.target.value);
    console.log(matchedUserData);
    setSelectedUser(e.target.value);
    setEditUser({
      email: matchedUserData?.email || "",
      name: matchedUserData?.name || "",
    });
  };

  const handleEditUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/users/${selectedUser}`, editUser)
      .then(() => {
        setEditUser({ email: "", name: "" });
        setSelectedUser("");
        return axios.get<User[]>("http://localhost:8080/users");
      })
      .then(() => {
        fetchUsers();
      })
      .catch((error) =>
        console.error("There was an error updating the user:", error)
      );
  };

  return (
    <div className="p-4 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-4">Users</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs text-white bg-pink-500 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className=" bg-pink-300 text-neutral-800 border-b"
                >
                  <td className="py-4 px-6">{user.id}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <h2 className="text-lg font-bold mt-8 mb-4">Add a New User</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 max-w-md"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
        <div className=" w-1/2">
          <h2 className="text-lg font-bold mt-8 mb-4">Edit User</h2>

          <form
            onSubmit={handleEditUserSubmit}
            className="grid grid-cols-1 gap-4 max-w-md"
          >
            <select
              name="selectedUser"
              value={selectedUser}
              onChange={handleSelectUser}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={editUser.email}
              onChange={handleEditUserChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editUser.name}
              onChange={handleEditUserChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
