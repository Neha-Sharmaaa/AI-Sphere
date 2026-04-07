import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthCallback from "./components/AuthCallback";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRouter from "./components/DashboardRouter";
import StudentDashboard from "./pages/StudentDashboard";

// Router component to handle session_id synchronously
function AppRouter() {
  const location = useLocation();
  
  // CRITICAL: Check for session_id during render (not in useEffect)
  // This prevents race conditions by processing auth callback FIRST
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center">
              <p>Admin Dashboard (Coming Soon)</p>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/instructor/dashboard" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center">
              <p>Instructor Dashboard (Coming Soon)</p>
            </div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
