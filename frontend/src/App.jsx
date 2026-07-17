import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import SessionPage from "./pages/SessionPage.jsx";

// Wraps a route: if not signed in, saves intended path and redirects to home
function ProtectedRoute({ element }) {
  const { isSignedIn } = useUser();
  const location = useLocation();

  if (!isSignedIn) {
    // Save where user was trying to go before redirecting to sign-in
    sessionStorage.setItem("redirectAfterLogin", location.pathname + location.search);
    return <Navigate to="/" replace />;
  }

  return element;
}

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  // After sign-in, redirect to the saved URL (e.g. /session/xxx)
  useEffect(() => {
    if (isSignedIn) {
      const savedPath = sessionStorage.getItem("redirectAfterLogin");
      if (savedPath && savedPath !== "/") {
        sessionStorage.removeItem("redirectAfterLogin");
        navigate(savedPath, { replace: true });
      }
    }
  }, [isSignedIn, navigate]);

  // Prevents flickering while Clerk loads auth state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-white">Loading HireFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
        <Route path="/problems" element={<ProtectedRoute element={<ProblemsPage />} />} />
        <Route path="/problem/:id" element={<ProtectedRoute element={<ProblemPage />} />} />
        <Route path="/session/:id" element={<ProtectedRoute element={<SessionPage />} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
