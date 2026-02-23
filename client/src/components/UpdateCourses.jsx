import React, { useState, useEffect } from "react";

const UpdateCourses = () => {
  const defaultCourses = [
    { id: 1, title: "React for Beginners", instructor: "John Doe", duration: "6 weeks" },
    { id: 2, title: "Advanced JavaScript", instructor: "Jane Smith", duration: "8 weeks" },
    { id: 3, title: "Data Structures & Algorithms", instructor: "Alice Johnson", duration: "10 weeks" },
    { id: 4, title: "Quantum Computing", instructor: "Dr. Richard Feynman", duration: "12 weeks" },
    { id: 5, title: "Full Stack Web Development", instructor: "Emily Brown", duration: "14 weeks" },
    { id: 6, title: "Theory of Computation", instructor: "Dr. Alan Turing", duration: "10 weeks" },
    { id: 7, title: "Cloud Infrastructures", instructor: "Michael Carter", duration: "8 weeks" },
    { id: 8, title: "UX Design Fundamentals", instructor: "Sophia Wilson", duration: "6 weeks" },
    { id: 9, title: "Artificial Intelligence & Machine Learning", instructor: "Dr. Andrew Ng", duration: "16 weeks" },
    { id: 10, title: "Embedded Systems", instructor: "Robert Bosch", duration: "9 weeks" },
    { id: 11, title: "Probability & Statistics", instructor: "Dr. David Williams", duration: "8 weeks" }
  ];

  const [courses, setCourses] = useState([]);

  // Load courses from localStorage or default
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("coursesData"));
    if (storedCourses?.length) {
      setCourses(storedCourses);
    } else {
      setCourses(defaultCourses);
      localStorage.setItem("coursesData", JSON.stringify(defaultCourses));
    }
  }, []);

  // Add a new course
  const handleAddCourse = () => {
    const title = prompt("Course Title:");
    if (!title) return;

    const instructor = prompt("Instructor Name:");
    if (!instructor) return;

    const duration = prompt("Course Duration:");
    if (!duration) return;

    const newCourse = {
      id: Date.now(),
      title,
      instructor,
      duration
    };

    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
  };

  // Delete a course
  const handleDeleteCourse = (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    const updatedCourses = courses.filter(c => c.id !== id);
    setCourses(updatedCourses);
    localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
  };

  // Edit a course
  const handleEditCourse = (id) => {
    const courseToEdit = courses.find(c => c.id === id);
    if (!courseToEdit) return;

    const title = prompt("Course Title:", courseToEdit.title);
    if (!title) return;

    const instructor = prompt("Instructor Name:", courseToEdit.instructor);
    if (!instructor) return;

    const duration = prompt("Course Duration:", courseToEdit.duration);
    if (!duration) return;

    const updatedCourses = courses.map(c =>
      c.id === id ? { ...c, title, instructor, duration } : c
    );
    setCourses(updatedCourses);
    localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
  };

  return (
    <div className="update-courses-container">
      <h1>Admin: Update Courses</h1>
      <button className="add-btn" onClick={handleAddCourse}>➕ Add Course</button>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Duration:</strong> {course.duration}</p>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => handleEditCourse(course.id)}>✏️ Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteCourse(course.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .update-courses-container {
          padding: 40px 20px;
          min-height: 100vh;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          text-align: center;
        }

        h1 {
          color: #123c5a;
          font-size: 2.5rem;
          margin-bottom: 25px;
        }

        .add-btn {
          padding: 10px 20px;
          margin-bottom: 25px;
          border: none;
          border-radius: 12px;
          background: #1f6f8b;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .add-btn:hover {
          background: #123c5a;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .course-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          text-align: left;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .course-card h2 {
          font-size: 1.5rem;
          color: #123c5a;
          margin-bottom: 10px;
        }

        .course-card p {
          font-size: 1rem;
          color: #4a6572;
          margin: 6px 0;
        }

        .card-buttons {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .edit-btn, .delete-btn {
          padding: 8px 14px;
          border-radius: 10px;
          border: none;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .edit-btn {
          background-color: #1f6f8b; /* blue */
        }

        .edit-btn:hover {
          background-color: #123c5a;
        }

        .delete-btn {
          background-color: #008080; /* teal */
        }

        .delete-btn:hover {
          background-color: #006666;
        }
      `}</style>
    </div>
  );
};

export default UpdateCourses;