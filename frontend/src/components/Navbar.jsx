import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-strong sticky top-0 z-50 border-b border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-all duration-300"
        >
          <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-800 flex items-center justify-center shadow-lg">
            <SparklesIcon className="size-7 text-purple-300" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-2xl bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-wider">
              HireFlow
            </span>
            <span className="text-xs text-gray-400 font-medium -mt-1">Code • Connect • Conquer</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to={"/problems"}
            className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden
              ${
                isActive("/problems")
                  ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-gray-200 shadow-md"
                  : "glass text-gray-300 hover:text-gray-200 border border-purple-500/10 hover:border-purple-500/20"
              }
            `}
          >
            <div className="relative z-10 flex items-center gap-2.5">
              <BookOpenIcon className="size-5" />
              <span className="font-bold hidden sm:inline">Problems</span>
            </div>
            {!isActive("/problems") && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/0 via-purple-700/10 to-purple-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden
              ${
                isActive("/dashboard")
                  ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-gray-200 shadow-md"
                  : "glass text-gray-300 hover:text-gray-200 border border-purple-500/10 hover:border-purple-500/20"
              }
            `}
          >
            <div className="relative z-10 flex items-center gap-2.5">
              <LayoutDashboardIcon className="size-5" />
              <span className="font-bold hidden sm:inline">Dashboard</span>
            </div>
            {!isActive("/dashboard") && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/0 via-purple-700/10 to-purple-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </Link>

          <div className="ml-4 relative">
            <div className="glass rounded-full p-1 border border-purple-500/20">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
