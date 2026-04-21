import { useState, useEffect } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Activity, Clock, Loader2, AlertCircle } from "lucide-react";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get("/logs");
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch logs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getActionColor = (action) => {
    switch (action) {
      case "CREATE_ARTICLE":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "PUBLISH_ARTICLE":
        return "bg-indigo-50 text-indigo-600 border-indigo-200";
      case "DELETE_ARTICLE":
        return "bg-rose-50 text-rose-600 border-rose-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <Activity className="text-indigo-500" /> System Audit Logs
        </h1>
        <p className="text-slate-500 mt-1">Review activity events across the application.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-20">
            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-700">No logs available</h3>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {logs.map((log, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={log._id || index}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold tracking-wider ${getActionColor(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      User ID: <span className="text-slate-500 font-mono text-xs">{log.userId}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Target Article ID: <span className="font-mono">{log.articleId || "N/A"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium whitespace-nowrap">
                  <Clock size={14} />
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
