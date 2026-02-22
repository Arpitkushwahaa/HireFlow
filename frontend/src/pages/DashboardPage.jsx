import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useCreateSession, useMyRecentSessions } from "../hooks/useSessions.js";
import axiosInstance from "../lib/axios.js";

import Navbar from "../components/Navbar.jsx";
import WelcomeSection from "../components/WelcomeSection.jsx";
import RecentSessions from "../components/RecentSessions.jsx";
import CreateSessionModal from "../components/CreateSessionModal.jsx";
import JoinSessionModal from "../components/JoinSessionModal.jsx";
import SessionCreatedModal from "../components/SessionCreatedModal.jsx";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [createdSession, setCreatedSession] = useState(null);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "", interviewType: "" });

  const createSessionMutation = useCreateSession();

  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  // Sync user to MongoDB on first load
  useEffect(() => {
    const syncUser = async () => {
      try {
        const response = await axiosInstance.post("/auth/sync");
        if (response.status === 200 || response.status === 201) {
          console.log("✅ User synced successfully");
        }
      } catch (error) {
        // Silently handle errors - the axios interceptor will auto-retry if needed
        // Only log for debugging purposes
        if (error.response?.status === 401) {
          console.warn("Authentication check - Clerk token may need refresh");
        } else if (error.response?.status === 200) {
          // User already exists
          console.log("User already synced");
        } else {
          console.log("User sync will be handled on next API call");
        }
      }
    };

    if (user) {
      syncUser();
    }
  }, [user]);

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty || !roomConfig.interviewType) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
        interviewType: roomConfig.interviewType,
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          setCreatedSession(data.session);
          // Don't navigate immediately - show join code first
        },
      }
    );
  };

  const recentSessions = recentSessionsData?.sessions || [];

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection 
          onCreateSession={() => setShowCreateModal(true)} 
          onJoinSession={() => setShowJoinModal(true)}
        />

        {/* Grid layout */}
        <div className="container mx-auto px-6 pb-16">
          <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />

      <JoinSessionModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />

      <SessionCreatedModal
        session={createdSession}
        onClose={() => setCreatedSession(null)}
      />
    </>
  );
}

export default DashboardPage;
