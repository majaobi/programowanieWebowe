import React, { useState, useEffect } from "react";
import axios from "axios";

interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
}

interface NewComment {
  content: string;
  userId: string;
  postId: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<NewComment>({
    content: "",
    userId: "",
    postId: "",
  });
  const [editComment, setEditComment] = useState<{
    content: string;
    userId: string;
    postId: string;
  }>({
    content: "",
    userId: "",
    postId: "",
  });
  const [selectedComment, setSelectedComment] = useState<string>("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios
      .get<Comment[]>("http://localhost:8080/comments")
      .then((response) => setComments(response.data))
      .catch((error) =>
        console.error("There was an error fetching the comments:", error)
      );
  };

  const handleDeleteComment = (commentId: string) => {
    axios
      .delete(`http://localhost:8080/comments/${commentId}`)
      .then(() => {
        fetchComments(); // Refresh the list of comments after a deletion
      })
      .catch((error) =>
        console.error("There was an error deleting the comment:", error)
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/comments", newComment)
      .then(() => {
        setNewComment({ content: "", userId: "", postId: "" });
        return axios.get<Comment[]>("http://localhost:8080/comments");
      })
      .then(() => {
        fetchComments();
      })
      .catch((error) =>
        console.error("There was an error posting the comment:", error)
      );
  };

  const handleEditCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditComment({ ...editComment, [name]: value });
  };

  const handleSelectComment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const matchedCommentData = comments.find(
      (comment) => comment.id === e.target.value
    );
    console.log(matchedCommentData);
    setSelectedComment(e.target.value);
    setEditComment({
      content: matchedCommentData?.content || "",
      userId: matchedCommentData?.userId || "",
      postId: matchedCommentData?.postId || "",
    });
  };

  const handleEditCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/comments/${selectedComment}`, editComment)
      .then(() => {
        setEditComment({ content: "", userId: "", postId: "" });
        setSelectedComment("");
        return axios.get<Comment[]>("http://localhost:8080/comments");
      })
      .then(() => {
        fetchComments();
      })
      .catch((error) =>
        console.error("There was an error updating the comment:", error)
      );
  };

  return (
    <div className="p-4 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-4">Comments</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-50 bg-pink-500 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Content
                </th>
                <th scope="col" className="py-3 px-6">
                  User ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Post ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment.id}
                  className="bg-pink-300 text-gray-800 border-b"
                >
                  <td className="py-4 px-6">{comment.id}</td>
                  <td className="py-4 px-6">{comment.content}</td>
                  <td className="py-4 px-6">{comment.userId}</td>
                  <td className="py-4 px-6">{comment.postId}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
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
          <h2 className="text-lg font-bold mt-8 mb-4">Add a New Comment</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 max-w-md"
          >
            <textarea
              name="content"
              placeholder="Content"
              value={newComment.content}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 h-20"
            />
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={newComment.userId}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              name="postId"
              placeholder="Post ID"
              value={newComment.postId}
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
          <h2 className="text-lg font-bold mt-8 mb-4">Edit Comment</h2>
          <form
            onSubmit={handleEditCommentSubmit}
            className="grid grid-cols-1 gap-4 max-w-md"
          >
            <select
              name="selectedComment"
              value={selectedComment}
              onChange={handleSelectComment}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" disabled>
                Select a comment
              </option>
              {comments.map((comment) => (
                <option key={comment.id} value={comment.id}>
                  {`Comment ID: ${comment.id}, Content: ${comment.content.substring(0, 20)}...`}
                </option>
              ))}
            </select>
            <textarea
              name="content"
              placeholder="Content"
              value={editComment.content}
              onChange={handleEditCommentChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 h-20"
            />
            <input
              type="text"
              name="userId"
              value={editComment.userId}
              onChange={handleEditCommentChange}
              required
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              name="postId"
              value={editComment.postId}
              onChange={handleEditCommentChange}
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
export default Comments;
