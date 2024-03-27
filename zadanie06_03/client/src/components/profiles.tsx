import React, { useState, useEffect } from "react";
import axios from "axios";

interface Profile {
  id: string;
  bio: string;
}

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newProfile, setNewProfile] = useState<{ id: string; bio: string }>({ id: "", bio: "" });
  const [editProfile, setEditProfile] = useState<{ bio: string }>({ bio: "" });
  const [selectedProfile, setSelectedProfile] = useState<string>("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    axios
      .get<Profile[]>("http://localhost:8080/profile") // Make sure the URL is correct
      .then((response) => setProfiles(response.data))
      .catch((error) =>
        console.error("There was an error fetching the profiles:", error)
      );
  };

  const handleDeleteProfile = (profileId: string) => {
    axios
      .delete(`http://localhost:8080/profile/${profileId}`)
      .then(() => {
        fetchProfiles(); // Refresh the list of profiles after a deletion
      })
      .catch((error) =>
        console.error("There was an error deleting the profile:", error)
      );
  };

  const handleNewProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleNewProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/profile", { id: newProfile.id, bio: newProfile.bio }) // The backend expects 'id' for the userId
      .then(() => {
        setNewProfile({ id: "", bio: "" });
        fetchProfiles();
      })
      .catch((error) =>
        console.error("There was an error posting the profile:", error)
      );
  };

  const handleEditProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProfile({ bio: e.target.value });
  };

  const handleSelectProfile = (profileId: string) => {
    const matchedProfile = profiles.find((profile) => profile.id === profileId);
    setSelectedProfile(profileId);
    setEditProfile({ bio: matchedProfile?.bio || "" });
  };

  const handleEditProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/profile/${selectedProfile}`, editProfile)
      .then(() => {
        setEditProfile({ bio: "" });
        setSelectedProfile("");
        fetchProfiles();
      })
      .catch((error) =>
        console.error("There was an error updating the profile:", error)
      );
  };
  return (
    <div className="p-4 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-4">Profiles</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-50 bg-pink-500 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  User ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Bio
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id} className="bg-pink-300 text-gray-800 border-b">
                  <td className="py-4 px-6">{profile.id}</td>
                  <td className="py-4 px-6">{profile.bio}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleSelectProfile(profile.id)}
                      className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
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
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Create Profile</h2>
        <form onSubmit={handleNewProfileSubmit} className="grid grid-cols-1 gap-4 max-w-md">
          <input
            type="text"
            name="id"
            placeholder="User ID"
            value={newProfile.id}
            onChange={handleNewProfileChange}
            required
            className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={newProfile.bio}
            onChange={handleNewProfileChange}
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
      {selectedProfile && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
          <form onSubmit={handleEditProfileSubmit} className="grid grid-cols-1 gap-4 max-w-md">
            <input
              type="text"
              name="bio"
              placeholder="Bio"
              value={editProfile.bio}
              onChange={handleEditProfileChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
  
}

export default Profiles;