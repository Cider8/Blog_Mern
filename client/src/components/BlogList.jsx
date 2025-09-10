import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../features/blogSlice";

export default function BlogList({ onSelect, onEdit, selectedBlog }) {
  const blogs = useSelector((state) => state.blogs.items);
  const dispatch = useDispatch();

  return (
      <div className="w-1/3 border-r pr-6">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-7">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Blogs"
          className="w-10 h-10 rounded-lg object-cover shadow"
        />
        <h2 className="text-3xl font-bold">Blogs</h2>
      </div>
      {/* Add New Blog Button */}
      <button
        className="mb-4 w-full px-4 py-2 bg-purple-600 hover:bg-blue-700 text-white rounded-lg shadow"
        onClick={() => onEdit({ title: "Untitled", content: "" })}
      >
        + New Blog
      </button>

      <ul className="space-y-3">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className={`p-3 rounded-lg cursor-pointer transition ${
              selectedBlog?._id === blog._id
                ? "bg-blue-100 border border-blue-400"
                : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => onSelect(blog)}
            onDoubleClick={() => onEdit(blog)}
          >
            <div className="font-semibold">{blog.title || "Untitled"}</div>
            <p className="text-xs text-gray-500 truncate">
              {blog.content.replace(/<[^>]+>/g, "").slice(0, 40)}...
            </p>
            <button
              className="mt-2 text-red-500 hover:text-red-700 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteBlog(blog._id));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}



