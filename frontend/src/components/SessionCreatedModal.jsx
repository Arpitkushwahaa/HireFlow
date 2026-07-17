import { Copy, CheckIcon, VideoIcon, Link2Icon, MailIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function SessionCreatedModal({ session, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const navigate = useNavigate();

  if (!session) return null;

  const meetingLink = `${window.location.origin}/session/${session._id}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(session.joinCode);
    setCopiedCode(true);
    toast.success("Join code copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopiedLink(true);
    toast.success("Meeting link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const buildEmailContent = () => {
    const subject = `Join Interview Session - ${session.problem}`;
    const body =
      `You're invited to join an interview session on HireFlow!\n\n` +
      `Problem: ${session.problem}\n` +
      `Difficulty: ${session.difficulty.toUpperCase()}\n` +
      `Interview Type: ${session.interviewType}\n\n` +
      `Meeting Link: ${meetingLink}\n\n` +
      `Or use Join Code: ${session.joinCode}\n` +
      `(Go to ${window.location.origin} and click "Join Session", then enter the code)\n\n` +
      `Good luck!`;
    return { subject, body };
  };

  const handleShareViaGmail = () => {
    const { subject, body } = buildEmailContent();
    const to = recipientEmail ? encodeURIComponent(recipientEmail) : "";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
    setShowEmailForm(false);
    setRecipientEmail("");
    toast.success("Gmail compose opened in new tab!");
  };

  const handleShareViaMailto = () => {
    const { subject, body } = buildEmailContent();
    const to = recipientEmail ? encodeURIComponent(recipientEmail) : "";
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");
    setShowEmailForm(false);
    setRecipientEmail("");
  };

  const handleJoinSession = () => {
    navigate(`/session/${session._id}`);
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-sm sm:max-w-md mx-4">
        <h3 className="font-bold text-2xl mb-6 text-center">Session Created! 🎉</h3>

        <div className="space-y-6">
          {/* Meeting Link */}
          <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl p-6 text-center border-2 border-secondary/30">
            <p className="text-sm text-base-content/70 mb-2 flex items-center justify-center gap-2">
              <Link2Icon className="w-4 h-4" />
              Share this meeting link:
            </p>
            <div className="bg-base-100 rounded-lg p-3 mb-3 font-mono text-sm break-all">
              {meetingLink}
            </div>
            <button onClick={handleCopyLink} className="btn btn-secondary btn-sm w-full">
              {copiedLink ? (
                <><CheckIcon className="w-4 h-4" /> Copied!</>
              ) : (
                <><Copy className="w-4 h-4" /> Copy Meeting Link</>
              )}
            </button>
          </div>

          {/* Join Code */}
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 text-center">
            <p className="text-sm text-base-content/70 mb-2">Or share this code:</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-5xl font-black tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {session.joinCode}
              </div>
              <button onClick={handleCopyCode} className="btn btn-circle btn-ghost btn-sm" title="Copy join code">
                {copiedCode ? <CheckIcon className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5" />}
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
                session.difficulty === "easy" ? "badge-success" :
                session.difficulty === "medium" ? "badge-warning" : "badge-error"
              }`}>
                {session.difficulty.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Interview Type:</span>
              <span className="font-semibold">{session.interviewType}</span>
            </div>
          </div>

          {/* Share via Email — inline expandable (no nested modal) */}
          <div className="border border-base-300 rounded-xl overflow-hidden">
            <button
              className="btn btn-accent w-full gap-2 rounded-xl"
              onClick={() => setShowEmailForm((prev) => !prev)}
            >
              <MailIcon className="w-4 h-4" />
              Share via Email
              {showEmailForm && <ChevronUpIcon className="w-4 h-4 ml-auto" />}
            </button>

            {showEmailForm && (
              <div className="p-4 space-y-3 bg-base-200">
                <div>
                  <label className="label py-0 mb-1">
                    <span className="label-text text-sm font-medium">Recipient Email (optional)</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered input-sm w-full"
                    placeholder="candidate@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleShareViaGmail()}
                    autoFocus
                  />
                  <p className="text-xs text-base-content/50 mt-1">Leave blank to fill in Gmail</p>
                </div>

                <button
                  className="btn btn-error btn-sm w-full gap-2"
                  onClick={handleShareViaGmail}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Open in Gmail
                </button>

                <button
                  className="btn btn-outline btn-sm w-full gap-2"
                  onClick={handleShareViaMailto}
                >
                  <MailIcon className="w-4 h-4" />
                  Open in Default Mail App
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="btn btn-ghost flex-1" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary flex-1" onClick={handleJoinSession}>
              <VideoIcon className="w-5 h-5" />
              Start Interview
            </button>
          </div>

          {/* Instructions */}
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs">
              <p className="font-semibold">How candidates can join:</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Click the meeting link (works directly)</li>
                <li>OR use "Join Session" button with the code</li>
                <li>Can join from any device with any email</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionCreatedModal;
