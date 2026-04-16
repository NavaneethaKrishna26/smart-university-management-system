import React from 'react';

const courses = [
  { id: 1, title: 'Web Development', code: 'CS101', instructor: 'Dr. Smith', credits: 3 },
  { id: 2, title: 'Data Structures', code: 'CS201', instructor: 'Prof. Johnson', credits: 4 },
  { id: 3, title: 'Machine Learning', code: 'AI301', instructor: 'Dr. Lee', credits: 3 },
];

function CoursesPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>All Courses</h1>
        <div className="page-actions">
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="form-input search-input"
          />
        </div>
      </div>

      <div className="cards-grid">
        {courses.map(course => (
          <div key={course.id} className="card course-card">
            <div className="course-header">
              <div className="course-code">{course.code}</div>
              <div className="course-credits">{course.credits} credits</div>
            </div>
            <h3>{course.title}</h3>
            <div className="course-instructor">
              👨‍🏫 {course.instructor}
            </div>
            <div className="course-actions">
              <button className="btn btn-primary">View Details</button>
              <button className="btn btn-ghost">Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default CoursesPage;
