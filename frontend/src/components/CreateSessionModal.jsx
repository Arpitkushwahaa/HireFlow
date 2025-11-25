import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS, DIFFICULTY_COLORS } from "../data/problems";
import { INTERVIEW_QUESTIONS } from "../data/interviewQuestions";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const interviewTypes = ["HR", "Full-Stack", "Backend", "Frontend", "Product Engineer", "DSA", "System Design"];

  // Get problems based on selected interview type
  const getProblemsForInterviewType = () => {
    if (!roomConfig.interviewType) return [];
    
    if (roomConfig.interviewType === "DSA") {
      // Filter PROBLEMS by interviewType === "DSA"
      return Object.values(PROBLEMS).filter(p => p.interviewType === "DSA");
    } else {
      // Return interview-specific questions
      return INTERVIEW_QUESTIONS[roomConfig.interviewType] || [];
    }
  };

  const availableProblems = getProblemsForInterviewType();

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    return DIFFICULTY_COLORS[difficulty] || "#666";
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          {/* INTERVIEW TYPE SELECTION */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Interview Type</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={roomConfig.interviewType || ""}
              onChange={(e) => {
                setRoomConfig({
                  ...roomConfig,
                  interviewType: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose interview type...
              </option>

              {interviewTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* PROBLEM SELECTION */}
          {roomConfig.interviewType && (
            <div className="space-y-2">
              <label className="label">
                <span className="label-text font-semibold">Select Problem/Question</span>
                <span className="label-text-alt text-error">*</span>
              </label>

              <div className="max-h-96 overflow-y-auto border border-gray-700 rounded-lg p-2">
                {availableProblems.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No problems available</p>
                ) : (
                  <div className="space-y-2">
                    {availableProblems.map((problem) => (
                      <div
                        key={problem.id}
                        onClick={() => {
                          setRoomConfig({
                            ...roomConfig,
                            difficulty: problem.difficulty,
                            problem: problem.title,
                          });
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-800 ${
                          roomConfig.problem === problem.title ? "bg-primary/20 border border-primary" : "bg-gray-900"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{problem.title}</p>
                            {problem.topic && (
                              <p className="text-sm text-gray-400 mt-1">{problem.topic}</p>
                            )}
                            {problem.category && problem.category !== problem.topic && (
                              <p className="text-xs text-gray-500 mt-1">{problem.category}</p>
                            )}
                          </div>
                          <div
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: getDifficultyColor(problem.difficulty) + "20",
                              color: getDifficultyColor(problem.difficulty),
                              border: `1px solid ${getDifficultyColor(problem.difficulty)}`,
                            }}
                          >
                            {problem.difficulty}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {availableProblems.length > 0 && (
                <p className="text-sm text-gray-400 mt-2">
                  {availableProblems.length} problems available
                </p>
              )}
            </div>
          )}

          {/* ROOM SUMMARY */}
          {roomConfig.problem && roomConfig.interviewType && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Interview Type: <span className="font-medium">{roomConfig.interviewType}</span>
                </p>
                <p>
                  Problem: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem || !roomConfig.interviewType}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;
