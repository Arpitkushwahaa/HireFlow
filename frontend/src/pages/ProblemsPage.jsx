import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Practice Problems</h1>
          <p className="text-gray-400">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block glass-strong rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between gap-4">
                {/* LEFT SIDE */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-12 rounded-lg bg-purple-700/30 flex items-center justify-center">
                      <Code2Icon className="size-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-gray-200">{problem.title}</h2>
                        <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400"> {problem.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-3">{problem.description.text}</p>
                </div>
                {/* RIGHT SIDE */}

                <div className="flex items-center gap-2 text-purple-400">
                  <span className="font-medium">Solve</span>
                  <ChevronRightIcon className="size-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-12 glass-strong rounded-2xl p-6 border border-purple-500/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Total Problems</div>
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">{problems.length}</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Easy</div>
              <div className="text-4xl font-black text-green-400">{easyProblemsCount}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Medium</div>
              <div className="text-4xl font-black text-yellow-400">{mediumProblemsCount}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Hard</div>
              <div className="text-4xl font-black text-red-400">{hardProblemsCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProblemsPage;
