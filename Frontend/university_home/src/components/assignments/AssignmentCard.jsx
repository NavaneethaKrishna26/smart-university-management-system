import React from 'react';
import { Link } from 'react-router-dom';

function AssignmentCard({ assignment }) {
  return (
    <article className="card">
      <h3>{assignment.title}</h3>
      <p>{assignment.courseName}</p>
      <p className="card-meta">Due: {assignment.dueDate}</p>
      <div className="card-actions">
        <Link
          to={`/student/assignments/${assignment.id}/upload`}
          className="btn btn-ghost"
        >
          Upload
        </Link>
        {assignment.submissionId && (
          <Link
            to={`/student/assignments/${assignment.submissionId}/feedback`}
            className="btn btn-primary"
          >
            View Feedback
          </Link>
        )}
      </div>
    </article>
  );
}

export default AssignmentCard;
