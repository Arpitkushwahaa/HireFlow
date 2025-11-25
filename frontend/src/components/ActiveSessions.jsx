import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 glass-strong rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/30 h-full">
      <div>
        {/* HEADERS SECTION */}
        <div className="flex items-center justify-between mb-6">
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-700 to-indigo-700 rounded-xl">
              <ZapIcon className="size-5 text-purple-300" />
            </div>
            <h2 className="text-2xl font-black text-gray-200">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-400">{sessions.length} active</span>
          </div>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-10 animate-spin text-purple-400" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className="glass rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4 p-5">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative size-14 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-700 flex items-center justify-center">
                      <Code2Icon className="size-7 text-purple-300" />
                      <div className="absolute -top-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-black" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg truncate text-gray-200">{session.problem}</h3>
                        <span
                          className={`badge badge-sm ${getDifficultyBadgeClass(
                            session.difficulty
                          )}`}
                        >
                          {session.difficulty.slice(0, 1).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-4" />
                          <span className="font-medium">{session.host?.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-4" />
                          <span className="text-xs">{session.participant ? "2/2" : "1/2"}</span>
                        </div>
                        {session.participant && !isUserInSession(session) ? (
                          <span className="px-2 py-0.5 rounded text-xs bg-red-900/30 text-red-400 border border-red-700/30">FULL</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400 border border-green-700/30">OPEN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {session.participant && !isUserInSession(session) ? (
                    <button className="px-4 py-2 rounded-lg bg-gray-800 text-gray-500 text-sm font-bold cursor-not-allowed">Full</button>
                  ) : (
                    <Link to={`/session/${session._id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 text-gray-200 text-sm font-bold hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-3xl flex items-center justify-center">
                <SparklesIcon className="w-10 h-10 text-purple-500/50" />
              </div>
              <p className="text-lg font-semibold text-gray-400 mb-1">No active sessions</p>
              <p className="text-sm opacity-50">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ActiveSessions;
