import React from 'react';
import Badge from '../ui/Badge';

function FeedbackPanel({ feedback }) {
  if (!feedback) return null;
  const { contentScore, grammarScore, originalityScore, overallGrade, feedbackSummary } =
    feedback;

  return (
    <div className="card card-wide">
      <div className="feedback-header">
        <h2>AI Feedback</h2>
        <Badge text={overallGrade} variant="primary" />
      </div>
      <div className="feedback-scores">
        <div className="score-item">
          <span>Content</span>
          <strong>{contentScore}/10</strong>
        </div>
        <div className="score-item">
          <span>Grammar</span>
          <strong>{grammarScore}/10</strong>
        </div>
        <div className="score-item">
          <span>Originality</span>
          <strong>{originalityScore}/10</strong>
        </div>
      </div>
      <p className="feedback-summary">{feedbackSummary}</p>
    </div>
  );
}

export default FeedbackPanel;
