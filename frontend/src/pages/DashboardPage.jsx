import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useCreateSession, useMyRecentSessions } from "../hooks/useSessions";
import axiosInstance from "../lib/axios";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";
import JoinSessionModal from "../components/JoinSessionModal";
import SessionCreatedModal from "../components/SessionCreatedModal";

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
        await axiosInstance.post("/auth/sync");
        console.log("✅ User synced successfully");
      } catch (error) {
        // User already synced or will be synced on next action
        const message = error.response?.data?.message || "User sync pending";
        console.log("User sync:", message);
        
        // If it's a 401, it might be a Clerk token issue - but don't show error to user
        if (error.response?.status === 401) {
          console.warn("Authentication issue - user may need to sign in again");
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
