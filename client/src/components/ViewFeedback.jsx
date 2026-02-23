import React, { useEffect, useState } from "react";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedbacks =
      JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    setFeedbacks(storedFeedbacks.slice().reverse());
  }, []);

  const toggleSelectFeedback = (index) => {
    if (selectedFeedbacks.includes(index)) {
      setSelectedFeedbacks(
        selectedFeedbacks.filter((i) => i !== index)
      );
    } else {
      setSelectedFeedbacks([...selectedFeedbacks, index]);
    }
  };

  const deleteSelectedFeedbacks = () => {
    if (
      window.confirm(
        "Are you sure you want to delete selected feedback(s)?"
      )
    ) {
      const updatedFeedbacks = feedbacks.filter(
        (_, index) => !selectedFeedbacks.includes(index)
      );

      setFeedbacks(updatedFeedbacks);

      // Save back to localStorage (reverse again to maintain order)
      localStorage.setItem(
        "userFeedbacks",
        JSON.stringify(updatedFeedbacks.slice().reverse())
      );

      setSelectedFeedbacks([]);
      setEditMode(false);
    }
  };

  return (
    <div className="feedbacks-page">
      <h1>User Feedbacks</h1>
      <p className="feedback-count">
        Total Feedbacks: {feedbacks.length}
      </p>

      <button
        className="edit-btn"
        onClick={() => {
          setEditMode(!editMode);
          setSelectedFeedbacks([]);
        }}
      >
        {editMode ? "Cancel" : "Edit Feedbacks"}
      </button>

      {editMode && selectedFeedbacks.length > 0 && (
        <button
          className="delete-btn"
          onClick={deleteSelectedFeedbacks}
        >
          Delete Selected Feedbacks
        </button>
      )}

      {feedbacks.length > 0 ? (
        <div className="feedbacks-grid">
          {feedbacks.map((item, index) => (
            <div
              key={index}
              className={`feedback-card ${
                editMode && selectedFeedbacks.includes(index)
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                editMode && toggleSelectFeedback(index)
              }
            >
              <h2 className="course-title">{item.course}</h2>

              <p><strong>Instructor:</strong> {item.instructor}</p>
              <p><strong>Name:</strong> {item.fullName}</p>
              <p><strong>Register No:</strong> {item.registerNumber}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Year/Sem:</strong> {item.year}</p>

              {item.submittedAt && (
                <p>
                  <strong>Submitted On:</strong>{" "}
                  {new Date(item.submittedAt).toLocaleDateString()}
                </p>
              )}

              {item.starRatings && (
                <div className="ratings-section">
                  <strong>Star Ratings:</strong>
                  <ul>
                    {Object.entries(item.starRatings).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {"★".repeat(value)} ({value}/5)
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {item.options && (
                <div className="ratings-section">
                  <strong>Course Evaluation:</strong>
                  <ul>
                    {Object.entries(item.options).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              <p><strong>Best Part:</strong> {item.bestPart}</p>
              <p><strong>Improvements Suggested:</strong> {item.improvement}</p>
              <p><strong>Recommendation:</strong> {item.recommendation}</p>

              {item.additionalComments && (
                <p>
                  <strong>Additional Comments:</strong>{" "}
                  {item.additionalComments}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-feedbacks">No feedback submitted yet.</p>
      )}

      <style>{`
        .feedbacks-page {
          padding: 40px 20px;
          min-height: 100vh;
          background: linear-gradient(135deg, #d9f1f7, #b6e0f0, #c3eaf7);
          text-align: center;
          font-family: Arial, sans-serif;
        }

        h1 {
          font-size: 2.5rem;
          color: #123c5a;
          margin-bottom: 10px;
        }

        .feedback-count {
          font-size: 1.3rem;
          color: #1f6f8b;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .edit-btn, .delete-btn {
          padding: 10px 15px;
          margin: 10px 5px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          color: white;
        }

        .edit-btn {
          background-color: #1f6f8b;
        }

        .edit-btn:hover {
          background-color: #123c5a;
        }

        .delete-btn {
          background-color: #006994;
        }

        .delete-btn:hover {
          background-color: #004466;
        }

        .feedbacks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feedback-card {
          background: #ffffff;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .feedback-card.selected {
          border: 2px solid #006994;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .feedback-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .course-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1f6f8b;
          margin-bottom: 10px;
        }

        .ratings-section ul {
          padding-left: 18px;
          margin: 8px 0;
        }

        .ratings-section li {
          font-size: 0.95rem;
          color: #4a6572;
        }

        .no-feedbacks {
          font-size: 1.3rem;
          color: #123c5a;
        }
      `}</style>
    </div>
  );
};

export default ViewFeedback;