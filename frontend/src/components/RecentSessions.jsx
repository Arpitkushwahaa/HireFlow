import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="glass-strong rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/30 mt-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-indigo-700 to-purple-700 rounded-xl">
            <Clock className="w-5 h-5 text-purple-300" />
          </div>
          <h2 className="text-2xl font-black text-gray-200">Your Past Sessions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="w-10 h-10 animate-spin text-purple-400" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className={`glass rounded-xl relative border transition-all duration-300 ${
                  session.status === "active"
                    ? "border-green-700/30 hover:border-green-600/50"
                    : "border-purple-500/10 hover:border-purple-500/30"
                }`}
              >
                {session.status === "active" && (
                  <div className="absolute top-3 right-3">
                    <div className="px-2 py-1 rounded bg-green-900/30 border border-green-700/30 text-green-400 text-xs font-bold flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      ACTIVE
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        session.status === "active"
                          ? "bg-gradient-to-br from-green-700 to-green-800"
                          : "bg-gradient-to-br from-purple-700 to-indigo-700"
                      }`}
                    >
                      <Code2 className="w-6 h-6 text-purple-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1 truncate text-gray-200">{session.problem}</h3>
                      <span
                        className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}
                      >
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-purple-500/10">
                    <span className="text-xs font-semibold text-gray-400 uppercase">Completed</span>
                    <span className="text-xs text-gray-500">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-3xl flex items-center justify-center">
                <Trophy className="w-10 h-10 text-indigo-500/50" />
              </div>
              <p className="text-lg font-semibold text-gray-400 mb-1">No sessions yet</p>
              <p className="text-sm text-gray-500">Start your coding journey today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;
