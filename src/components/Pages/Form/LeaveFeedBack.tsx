import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LeaveFeedBack = () => {
  const [showFeedback, setShowFeedback] = useState(true);

  return (
    <>
      {showFeedback && (
        <Link
          className="feedback-container"
          to={"/feedback"}
          onClick={() => setShowFeedback(false)}
        >
          <h4 className="feedback-text">Leave Feedback</h4>
        </Link>
      )}
    </>
  );
};
