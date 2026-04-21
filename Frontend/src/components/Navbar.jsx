import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, LayoutDashboard, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white"
              >
                <ShieldAlert size={20} />
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-600">
                NexusAccess
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/" className="flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition-colors">
                  <LayoutDashboard size={18} />
                  <span className="font-medium text-sm">Dashboard</span>
                </Link>
                {["admin", "editor"].includes(user.role) && (
                  <Link to="/logs" className="flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition-colors">
                    <span className="font-medium text-sm">Audit Logs</span>
                  </Link>
                )}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-semibold text-slate-900">{user.name}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 inline-block w-max self-end uppercase">
                      {user.role}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-md">
                    <User size={20} />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
