export default function BlogView({ blog }) {
  if (!blog)
    return <div className="w-2/3 pl-6 text-gray-500">Select a blog to view.</div>;

  return (
    <div className="w-2/3 pl-6">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <p className="mt-4 text-sm text-gray-400">✔ Autosaved</p>
    </div>
  );
}
