import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { DSA_PROBLEMS, DIFFICULTY_COLORS } from "../data/dsaProblems";
import { INTERVIEW_QUESTIONS } from "../data/interviewQuestions";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);
  const interviewTypes = ["HR", "Full-Stack", "Backend", "Frontend", "Product Engineer", "DSA", "System Design"];

  // Get problems based on selected interview type
  const getProblemsForInterviewType = () => {
    if (!roomConfig.interviewType) return [];
    
    if (roomConfig.interviewType === "DSA") {
      return Object.values(DSA_PROBLEMS);
    } else {
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
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

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
