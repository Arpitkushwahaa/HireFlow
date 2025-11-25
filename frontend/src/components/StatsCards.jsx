import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      {/* Active Count */}
      <div className="glass-strong rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-purple-700/30 rounded-2xl">
            <UsersIcon className="w-7 h-7 text-purple-400" />
          </div>
          <div className="px-3 py-1 rounded-full bg-green-900/30 border border-green-700/30 text-green-400 text-xs font-bold">Live</div>
        </div>
        <div className="text-4xl font-black mb-1 text-gray-200">{activeSessionsCount}</div>
        <div className="text-sm text-gray-400">Active Sessions</div>
      </div>

      {/* Recent Count */}
      <div className="glass-strong rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-indigo-700/30 rounded-2xl">
            <TrophyIcon className="w-7 h-7 text-indigo-400" />
          </div>
        </div>
        <div className="text-4xl font-black mb-1 text-gray-200">{recentSessionsCount}</div>
        <div className="text-sm text-gray-400">Total Sessions</div>
      </div>
    </div>
  );
}

export default StatsCards;
