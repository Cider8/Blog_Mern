
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { saveBlog } from "../features/blogSlice";
import toast from "react-hot-toast";

export default function BlogEditor({ blog }) {
  const dispatch = useDispatch();
  const [currentBlog, setCurrentBlog] = useState(blog || { title: "", content: "" });
  const [status, setStatus] = useState("All changes saved ✅");

  // Keep state in sync when switching blogs
  useEffect(() => {
    if (blog) {
      setCurrentBlog({
        _id: blog._id,
        title: blog.title,
        content: blog.content,
      });
      setStatus("All changes saved ✅");
    }
  }, [blog]);

  // Track changes → mark as unsaved
  const handleChange = (field, value) => {
    setCurrentBlog((prev) => ({ ...prev, [field]: value }));
    setStatus("Unsaved changes");
  };

  // AutoSave with debounce + Toasts
  useEffect(() => {
    if (!currentBlog) return;

    if (status === "Unsaved changes") {
      const timeout = setTimeout(() => {
        setStatus("Saving...");
        dispatch(saveBlog(currentBlog))
          .unwrap()
          .then(() => {
            setStatus("All changes saved ✅");
            toast.success("Changes saved!", { id: "save-toast" });
          })
          .catch(() => {
            setStatus("Error saving");
            toast.error("Failed to save changes", { id: "save-toast" });
          });
      }, 3000); // autosave after 3s idle

      return () => clearTimeout(timeout);
    }
  }, [currentBlog, status, dispatch]);

  if (!currentBlog) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select or create a blog to start editing
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      {/* Title */}
      <input
        type="text"
        value={currentBlog.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Enter blog title..."
        className="text-2xl font-bold mb-4 p-2 border-b border-gray-300 dark:border-gray-700 bg-transparent outline-none"
      />

      {/* Editor */}
      <ReactQuill
        theme="snow"
        value={currentBlog.content || ""}
        onChange={(value) => handleChange("content", value)} 
        placeholder="Write something amazing..."
        className="h-[70vh] mb-4 bg-white dark:bg-gray-900 dark:text-gray-100"
      />

      {/* Status only */}
      <div className="flex justify-end items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">{status}</span>
      </div>
    </div>
  );
}

