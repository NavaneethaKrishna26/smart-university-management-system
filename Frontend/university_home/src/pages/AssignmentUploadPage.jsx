import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { uploadAssignment } from "../services/assignmentsService";
import FileInput from "../components/ui/FileInput";
import ErrorAlert from "../components/ui/ErrorAlert";
import Loader from "../components/ui/Loader";

function AssignmentUploadPage() {
  const { assignmentId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (selected) => {
    setError("");
    if (
      selected &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selected.type)
    ) {
      setError("Only PDF or DOC/DOCX files are allowed");
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!file) {
      setError("Please select a file");
      return;
    }
    if (!courseId) {
      setError("Please enter course ID");
      return;
    }
    setUploading(true);
    try {
      const data = await uploadAssignment(
        {
          courseId,
          assignmentId,
          file,
        },
        token,
      ); // POST /api/submissions[file:2]
      setSuccessMsg(
        "Assignment uploaded successfully; AI evaluation will be available soon.",
      );
      if (data && data.submissionId) {
        setTimeout(
          () => navigate(`/student/assignments/${data.submissionId}/feedback`),
          1000,
        );
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="page page-center">
      <div className="card card-wide">
        <h1>Upload Assignment</h1>
        <p className="muted">Assignment ID: {assignmentId}</p>
        <form className="form" onSubmit={handleSubmit}>
          <ErrorAlert message={error} />
          {successMsg && (
            <div className="alert alert-success">{successMsg}</div>
          )}
          <label className="form-control">
            <span className="form-label">Course ID</span>
            <input
              className="form-input"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </label>
          <FileInput
            label="Assignment File (PDF/DOC/DOCX)"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={uploading}
          >
            {uploading ? <Loader /> : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignmentUploadPage;
