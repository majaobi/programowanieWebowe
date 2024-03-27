import React, { useState, useEffect } from "react";
import axios from "axios";

interface Tag {
  id: string;
  name: string;
}

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<{ name: string }>({ name: "" });
  const [editTag, setEditTag] = useState<{ name: string }>({ name: "" });
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = () => {
    axios
      .get<Tag[]>("http://localhost:8080/tags") // Uwaga: poprawna ścieżka to http://localhost:8080/tags
      .then((response) => setTags(response.data))
      .catch((error) =>
        console.error("There was an error fetching the tags:", error)
      );
  };

  const handleDeleteTag = (tagId: string) => {
    axios
      .delete(`http://localhost:8080/tags/${tagId}`)
      .then(() => {
        fetchTags(); // Refresh the list of tags after a deletion
      })
      .catch((error) =>
        console.error("There was an error deleting the tag:", error)
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag({ name: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/tags", newTag)
      .then(() => {
        setNewTag({ name: "" });
        fetchTags();
      })
      .catch((error) =>
        console.error("There was an error posting the tag:", error)
      );
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTag({ name: e.target.value });
  };

  const handleSelectTag = (tagId: string) => {
    const matchedTagData = tags.find((tag) => tag.id === tagId);
    setSelectedTag(tagId);
    setEditTag({ name: matchedTagData?.name || "" });
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/tags/${selectedTag}`, editTag)
      .then(() => {
        setEditTag({ name: "" });
        setSelectedTag("");
        fetchTags();
      })
      .catch((error) =>
        console.error("There was an error updating the tag:", error)
      );
  };

  return (
    <div className="p-4 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-4">Tags</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-50 bg-pink-500 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Id
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
              {tags.map((tag) => (
                <tr key={tag.id} className="bg-pink-300 text-gray-800 border-b">
                  <td className="py-4 px-6">{tag.id}</td>
                  <td className="py-4 px-6">{tag.name}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleSelectTag(tag.id)}
                      className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
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
        <div className="mt-8 w-1/2">
          <h2 className="text-lg font-bold mb-4">Add a New Tag</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 max-w-md"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newTag.name}
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
        {selectedTag && (
          <div className="mt-8 w-1/2">
            <h2 className="text-lg font-bold mb-4">Edit Tag</h2>
            <form
              onSubmit={handleEditSubmit}
              className="grid grid-cols-1 gap-4 max-w-md"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editTag.name}
                onChange={handleEditChange}
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
    </div>
  );
};

export default Tags;
