import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchAssignmentFeedback } from "../services/assignmentsService";
import Loader from "../components/ui/Loader";
import ErrorAlert from "../components/ui/ErrorAlert";
import FeedbackPanel from "../components/assignments/FeedbackPanel";

function AssignmentFeedbackPage() {
  const { submissionId } = useParams();
  const { token } = useAuth();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchAssignmentFeedback(submissionId, token); // GET /api/submissions/{id}/feedback[file:2]
        if (mounted) setFeedback(data);
      } catch {
        if (mounted) setError("Failed to load AI feedback");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [submissionId, token]);

  return (
    <div className="page">
      <h1>Assignment Feedback</h1>
      <p className="muted">Submission ID: {submissionId}</p>
      {loading && <Loader />}
      <ErrorAlert message={error} />
      {!loading && !error && !feedback && (
        <p className="muted">
          Feedback not ready yet. Please check again later.
        </p>
      )}
      {feedback && <FeedbackPanel feedback={feedback} />}
    </div>
  );
}

export default AssignmentFeedbackPage;
