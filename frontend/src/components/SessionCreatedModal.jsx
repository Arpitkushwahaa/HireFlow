import { Copy, CheckIcon, VideoIcon, Link2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function SessionCreatedModal({ session, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const navigate = useNavigate();

  if (!session) return null;

  const meetingLink = `${window.location.origin}/session/${session._id}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(session.joinCode);
    setCopiedCode(true);
    toast.success("Join code copied!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopiedLink(true);
    toast.success("Meeting link copied!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleJoinSession = () => {
    navigate(`/session/${session._id}`);
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-2xl mb-6 text-center">Session Created! 🎉</h3>

        <div className="space-y-6">
          {/* Meeting Link Display - Primary */}
          <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl p-6 text-center border-2 border-secondary/30">
            <p className="text-sm text-base-content/70 mb-2 flex items-center justify-center gap-2">
              <Link2Icon className="w-4 h-4" />
              Share this meeting link:
            </p>
            <div className="bg-base-100 rounded-lg p-3 mb-3 font-mono text-sm break-all">
              {meetingLink}
            </div>
            <button
              onClick={handleCopyLink}
              className="btn btn-secondary btn-sm w-full"
            >
              {copiedLink ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Meeting Link
                </>
              )}
            </button>
          </div>

          {/* Join Code Display - Alternative */}
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 text-center">
            <p className="text-sm text-base-content/70 mb-2">Or share this code:</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-5xl font-black tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {session.joinCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="btn btn-circle btn-ghost btn-sm"
                title="Copy join code"
              >
                {copiedCode ? (
                  <CheckIcon className="w-5 h-5 text-success" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-base-content/60">
              Candidate can enter this code using "Join Session" button
            </p>
          </div>

          {/* Session Details */}
          <div className="bg-base-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-base-content/70">Problem:</span>
              <span className="font-semibold">{session.problem}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Difficulty:</span>
              <span className={`badge ${
                session.difficulty === 'easy' ? 'badge-success' :
                session.difficulty === 'medium' ? 'badge-warning' : 'badge-error'
              }`}>
                {session.difficulty.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Interview Type:</span>
              <span className="font-semibold">{session.interviewType}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="btn btn-ghost flex-1" onClick={onClose}>
              Close
            </button>
            <button 
              className="btn btn-primary flex-1" 
              onClick={handleJoinSession}
            >
              <VideoIcon className="w-5 h-5" />
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionCreatedModal;
