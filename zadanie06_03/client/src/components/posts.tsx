import React, { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
}

interface NewPost {
  title: string;
  content: string;
  userId: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    content: "",
    userId: "",
  });
  const [editPost, setEditPost] = useState<{
    title: string;
    content: string;
    userId: string;
  }>({ title: "", content: "", userId: "" });
  const [selectedPost, setSelectedPost] = useState<string>("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get<Post[]>("http://localhost:8080/post")
      .then((response) => setPosts(response.data))
      .catch((error) =>
        console.error("There was an error fetching the posts:", error)
      );
  };

  const handleDeletePost = (postId: string) => {
    axios
      .delete(`http://localhost:8080/post/${postId}`)
      .then(() => {
        fetchPosts(); // Refresh the list of posts after a deletion
      })
      .catch((error) =>
        console.error("There was an error deleting the post:", error)
      );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/post", newPost)
      .then(() => {
        setNewPost({ title: "", content: "", userId: "" });
        return axios.get<Post[]>("http://localhost:8080/post");
      })
      .then(() => {
        fetchPosts();
      })
      .catch((error) =>
        console.error("There was an error posting the post:", error)
      );
  };

  const handleEditPostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditPost({ ...editPost, [name]: value });
  };

  const handleSelectPost = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const matchedPostData = posts.find((post) => post.id === e.target.value);
    setSelectedPost(e.target.value);
    setEditPost({
      title: matchedPostData?.title || "",
      content: matchedPostData?.content || "",
      userId: matchedPostData?.userId || "",
    });
  };

  const handleEditPostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/post/${selectedPost}`, editPost)
      .then(() => {
        setEditPost({ title: "", content: "", userId: "" });
        setSelectedPost("");
        return axios.get<Post[]>("http://localhost:8080/post");
      })
      .then(() => {
        fetchPosts();
      })
      .catch((error) =>
        console.error("There was an error updating the post:", error)
      );
  };

  return (
    <div className="p-4 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-4">Posts</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-50 bg-pink-500 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Content
                </th>
                <th scope="col" className="py-3 px-6">
                  User ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="bg-pink-300 text-gray-800 border-b"
                >
                  <td className="py-4 px-6">{post.id}</td>
                  <td className="py-4 px-6">{post.title}</td>
                  <td className="py-4 px-6">{post.content}</td>
                  <td className="py-4 px-6">{post.userId}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDeletePost(post.id)}
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
          <h2 className="text-lg font-bold mt-8 mb-4">Add a New Post</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 max-w-md"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newPost.title}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              name="content"
              placeholder="Content"
              value={newPost.content}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 h-20"
            />
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={newPost.userId}
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
        <div className="w-1/2">
          <h2 className="text-lg font-bold mt-8 mb-4">Edit Post</h2>
          <form
            onSubmit={handleEditPostSubmit}
            className="grid grid-cols-1 gap-4 max-w-md"
          >
            <select
              name="selectedPost"
              value={selectedPost}
              onChange={handleSelectPost}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" disabled>
                Select a post
              </option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editPost.title}
              onChange={handleEditPostChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              name="content"
              placeholder="Content"
              value={editPost.content}
              onChange={handleEditPostChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 h-20"
            />
            <input
              type="text"
              name="userId"
              value={editPost.userId}
              onChange={handleEditPostChange}
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

export default Posts;
