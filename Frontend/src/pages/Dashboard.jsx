import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle, FileText, Loader2, X } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchArticles = async () => {
    try {
      const { data } = await api.get("/articles");
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post("/articles", { title: newTitle, content: newContent });
      setIsModalOpen(false);
      setNewTitle("");
      setNewContent("");
      fetchArticles();
    } catch (error) {
      console.error("Failed to create article", error);
    } finally {
      setCreating(false);
    }
  };

  const handlePublish = async (id) => {
    try {
      await api.patch(`/articles/${id}/publish`);
      fetchArticles(); // refresh list
    } catch (error) {
      console.error("Failed to publish", error);
      alert(error.response?.data?.message || "Error publishing");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await api.delete(`/articles/${id}`);
      fetchArticles(); // refresh list
    } catch (error) {
      console.error("Failed to delete", error);
      alert(error.response?.data?.message || "Error deleting");
    }
  };

  const canManage = (article) => {
    if (user.role === "admin") return true;
    if (user.role === "editor" && article.createdBy === user.id) return true;
    return false;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Articles Hub</h1>
          <p className="text-slate-500 mt-1">Manage and view content based on your role privileges.</p>
        </div>
        {["admin", "editor"].includes(user.role) && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-md shadow-indigo-600/20"
          >
            <Plus size={18} />
            Write Article
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-indigo-500" size={40} />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 bg-white/50 border border-slate-200 rounded-3xl border-dashed">
          <FileText size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-700">No articles found</h3>
          <p className="text-slate-400 mt-1 text-sm">
            {["admin", "editor"].includes(user.role) ? "You haven't written any articles yet." : "There are currently no published articles."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {articles.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow group"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        article.status === "published"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}
                    >
                      {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1">
                    {article.content}
                  </p>
                </div>

                {canManage(article) && (
                  <div className="bg-slate-50 px-6 py-4 flex gap-3 border-t border-slate-100">
                    <button
                      onClick={() => handlePublish(article.id)}
                      disabled={article.status === "published"}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200"
                    >
                      <CheckCircle size={16} />
                      {article.status === "published" ? "Published" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="flex items-center justify-center p-2 rounded-lg text-slate-400 border border-slate-200 bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-800">New Draft</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleCreate} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Article Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                    placeholder="Enter a catchy title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Content</label>
                  <textarea
                    required
                    rows={5}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
                    placeholder="Write your article content here..."
                  />
                </div>
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex justify-center items-center px-5 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-70 flex-1 sm:flex-none sm:w-32"
                  >
                    {creating ? <Loader2 className="animate-spin" size={18} /> : "Save Draft"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
