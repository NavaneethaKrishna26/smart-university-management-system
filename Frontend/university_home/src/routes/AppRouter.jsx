import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import CoursesPage from "../pages/CoursesPage";
import LoginPage from "../pages/LoginPage";
import ContactPage from "../pages/ContactPage"; // <-- import contact page
import StudentDashboard from "../pages/StudentDashboard";
import FacultyDashboard from "../pages/FacultyDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AttendancePage from "../pages/AttendancePage";
import AttendanceHistoryPage from "../pages/AttendanceHistoryPage";
import AssignmentListPage from "../pages/AssignmentListPage";
import AssignmentUploadPage from "../pages/AssignmentUploadPage";
import AssignmentFeedbackPage from "../pages/AssignmentFeedbackPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contactpage" element={<ContactPage />} />

      {/* Protected routes */}
      <Route
        path="/student/*"
        element={<ProtectedRoute allowedRoles={["STUDENT"]} />}
      >
        <Route index element={<StudentDashboard />} />
        <Route path="assignments" element={<AssignmentListPage />} />
        <Route
          path="assignments/:assignmentId/upload"
          element={<AssignmentUploadPage />}
        />
        <Route
          path="assignments/:submissionId/feedback"
          element={<AssignmentFeedbackPage />}
        />
      </Route>

      <Route
        path="/faculty/*"
        element={<ProtectedRoute allowedRoles={["FACULTY"]} />}
      >
        <Route index element={<FacultyDashboard />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="attendance/history" element={<AttendanceHistoryPage />} />
      </Route>

      <Route
        path="/admin/*"
        element={<ProtectedRoute allowedRoles={["ADMIN"]} />}
      >
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
