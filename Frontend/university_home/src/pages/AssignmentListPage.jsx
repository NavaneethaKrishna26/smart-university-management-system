import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchStudentAssignments } from "../services/assignmentsService";
import Loader from "../components/ui/Loader";
import ErrorAlert from "../components/ui/ErrorAlert";
import AssignmentCard from "../components/assignments/AssignmentCard";

function AssignmentListPage() {
  const { token } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchStudentAssignments(token); // GET /api/student/assignments[file:2]
        if (mounted) setAssignments(data || []);
      } catch {
        if (mounted) setError("Failed to load assignments");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div className="page">
      <h1>Assignments</h1>
      <p className="muted">Upload your work and view AI feedback.</p>
      {loading && <Loader />}
      <ErrorAlert message={error} />
      <div className="cards-grid">
        {assignments.map((a) => (
          <AssignmentCard key={a.id} assignment={a} />
        ))}
      </div>
      {!loading && !error && assignments.length === 0 && (
        <p className="muted">No assignments available.</p>
      )}
    </div>
  );
}

export default AssignmentListPage;
