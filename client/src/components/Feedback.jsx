import React, { useState, useEffect } from "react";

const Feedback = ({ course }) => {
  const defaultStarCategories = [
    "Course Content Quality",
    "Faculty Teaching Effectiveness",
    "Practical / Lab Sessions",
    "Class Engagement",
    "Overall Satisfaction",
  ];

  const defaultOptions = [
    { key: "CourseStructure", label: "Course Structure was", choices: ["Very Well Organized","Organized","Average","Poorly Structured"] },
    { key: "SyllabusCoverage", label: "Syllabus Coverage", choices: ["Completed Fully","Mostly Covered","Partially Covered","Insufficient"] },
    { key: "FacultySupport", label: "Faculty Support Outside Class", choices: ["Very Supportive","Supportive","Sometimes Available","Not Available"] },
    { key: "Infrastructure", label: "Classroom & Infrastructure", choices: ["Excellent","Good","Average","Needs Improvement"] },
    { key: "AssignmentQuality", label: "Assignments & Assessments", choices: ["Very Relevant","Relevant","Moderate","Not Useful"] },
  ];

  const [starCategories, setStarCategories] = useState(defaultStarCategories);
  const [options, setOptions] = useState(defaultOptions);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const loadForm = () => {
      const savedForm = JSON.parse(localStorage.getItem("adminFeedbackForm"));
      setStarCategories(savedForm?.starCategories || defaultStarCategories);
      setOptions(savedForm?.options || defaultOptions);
    };

    loadForm();
    window.addEventListener("feedbackFormUpdated", loadForm);
    return () => window.removeEventListener("feedbackFormUpdated", loadForm);
  }, []);

  const handleRating = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedback = {
      course: course?.title || "N/A",
      instructor: course?.instructor || "N/A",
      fullName: e.target.fullName.value,
      registerNumber: e.target.registerNumber.value,
      email: e.target.email.value,
      year: e.target.year.value,
      starRatings: ratings,
      options: Object.fromEntries(options.map(o => [o.key, e.target[o.key]?.value])),
      bestPart: e.target.bestPart.value,
      improvement: e.target.improvement.value,
      recommendation: e.target.recommendation.value,
      additionalComments: e.target.additionalComments.value,
    };

    const storedFeedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    storedFeedbacks.push(feedback);
    localStorage.setItem("userFeedbacks", JSON.stringify(storedFeedbacks));

    alert("⭐ Feedback submitted successfully!");
    e.target.reset();
    setRatings({});
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Student Course Feedback Form</h1>

      {course && (
        <div className="course-info">
          <strong>Course:</strong> {course.title} <br />
          <strong>Instructor:</strong> {course.instructor}
        </div>
      )}

      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input name="fullName" type="text" required />
        </label>

        <label>
          Register Number:
          <input name="registerNumber" type="text" required />
        </label>

        <label>
          Email:
          <input name="email" type="email" required />
        </label>

        <label>
          Year / Semester:
          <input name="year" type="text" required />
        </label>

        <h2>⭐ Rate the Following:</h2>

        {starCategories.map((category) => (
          <div key={category} className="star-rating-block">
            <p>{category}</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${ratings[category] >= star ? "active" : ""}`}
                  onClick={() => handleRating(category, star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}

        <h2>Course & Faculty Evaluation</h2>

        {options.map(({ key, label, choices }) => (
          <label key={key}>
            {label}
            <select name={key} required>
              <option value="">Select</option>
              {choices.map((c, i) => <option key={i}>{c}</option>)}
            </select>
          </label>
        ))}

        <label>
          What did you like most about the course?
          <textarea name="bestPart" required />
        </label>

        <label>
          What improvements would you suggest?
          <textarea name="improvement" required />
        </label>

        <label>
          Would you recommend this course?
          <select name="recommendation" required>
            <option value="">Select</option>
            <option>Definitely Yes</option>
            <option>Yes</option>
            <option>Maybe</option>
            <option>No</option>
          </select>
        </label>

        <label>
          Additional Comments:
          <textarea name="additionalComments" />
        </label>

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>

      <style>{`
        .feedback-container {
          max-width: 900px;
          margin: 50px auto;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(90deg, #d9f1f7,#b6e0f0,#8fd3e8,#c3eaf7);
          color: #123c5a;
        }

        .feedback-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .course-info {
          text-align: center;
          margin-bottom: 25px;
          font-size: 1.1rem;
          color: #1f6f8b;
        }

        .feedback-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        label { display: flex; flex-direction: column; font-weight: 500; }

        input, select, textarea {
          margin-top: 8px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #1f6f8b;
          outline: none;
          font-size: 1rem;
          background-color: #fff;
        }

        textarea { min-height: 100px; resize: vertical; }

        .star-rating-block { margin-bottom: 15px; }

        .stars { display: flex; gap: 8px; font-size: 1.8rem; cursor: pointer; }

        .star {
          color: #ccc;
          transition: 0.2s;
        }

        .star.active {
          color: #ffb400;
          transform: scale(1.1);
        }

        .submit-btn {
          padding: 14px 22px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #1f6f8b,#123c5a);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #123c5a,#0f2e44);
        }
      `}</style>
    </div>
  );
};

export default Feedback;