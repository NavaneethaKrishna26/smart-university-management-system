// import { useEffect, useState } from "react";
// import "../App.css";
// import {
//   getStudentProfile,
//   getAssignments,
//   uploadSubmission,
// } from "../services/assignmentService";

// export default function AssignmentUpload() {
//   const [student, setStudent] = useState(null);
//   const [assignments, setAssignments] = useState([]);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [unit, setUnit] = useState("");
//   const [comments, setComments] = useState("");
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [message, setMessage] = useState("");

//   // 🔥 Fetch student + assignments together
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const studentRes = await getStudentProfile();
//         setStudent(studentRes.data);

//         const assignmentRes = await getAssignments();
//         setAssignments(assignmentRes.data);
//       } catch (error) {
//         console.error("Error loading data", error);
//       }
//     };

//     loadData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedAssignment || !file || !unit) {
//       setMessage("Please complete all required fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("assignmentId", selectedAssignment.id);
//     formData.append("courseId", selectedAssignment.courseId);
//     formData.append("unit", unit);
//     formData.append("comments", comments);
//     formData.append("file", file);

//     try {
//       await uploadSubmission(formData, (progressEvent) => {
//         const percent = Math.round(
//           (progressEvent.loaded * 100) / progressEvent.total,
//         );
//         setUploadProgress(percent);
//       });

//       setMessage("Assignment submitted successfully!");
//       setUploadProgress(0);
//       setFile(null);
//       setUnit("");
//       setComments("");
//       setSelectedAssignment(null);
//     } catch (error) {
//       console.error(error);
//       setMessage("Submission failed.");
//     }
//   };

//   if (!student) {
//     return <div className="loading">Loading student data...</div>;
//   }

//   return (
//     <div className="assignment-wrapper">
//       <div className="assignment-card-large">
//         <h2 className="form-title">Assignment Submission</h2>

//         {/* 🔹 Student Details */}
//         <div className="student-info">
//           <h3>Student Details</h3>
//           <div className="info-grid">
//             <p>
//               <strong>Name:</strong> {student.name}
//             </p>
//             <p>
//               <strong>Username:</strong> {student.username}
//             </p>
//             <p>
//               <strong>Register No:</strong> {student.registerNo}
//             </p>
//             <p>
//               <strong>Year:</strong> {student.year}
//             </p>
//             <p>
//               <strong>Department:</strong> {student.department}
//             </p>
//           </div>
//         </div>

//         {/* 🔹 Assignment Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Select Assignment</label>
//             <select
//               value={selectedAssignment?.id || ""}
//               onChange={(e) => {
//                 const assignment = assignments.find(
//                   (a) => a.id === Number(e.target.value),
//                 );
//                 setSelectedAssignment(assignment);
//               }}
//             >
//               <option value="">-- Select Assignment --</option>
//               {assignments.map((a) => (
//                 <option key={a.id} value={a.id}>
//                   {a.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Select Unit</label>
//             <select value={unit} onChange={(e) => setUnit(e.target.value)}>
//               <option value="">-- Select Unit --</option>
//               <option value="UNIT 1">Unit 1</option>
//               <option value="UNIT 2">Unit 2</option>
//               <option value="UNIT 3">Unit 3</option>
//               <option value="UNIT 4">Unit 4</option>
//               <option value="UNIT 5">Unit 5</option>
//             </select>
//           </div>

//           {selectedAssignment && (
//             <div className="due-date">
//               <strong>Due Date:</strong> {selectedAssignment.dueDate}
//             </div>
//           )}

//           <div className="form-group">
//             <label>Comments</label>
//             <textarea
//               rows="4"
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//               placeholder="Enter comments..."
//             />
//           </div>

//           <div className="form-group">
//             <label>Upload File</label>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//           </div>

//           {uploadProgress > 0 && (
//             <div className="progress-bar">
//               <div
//                 className="progress"
//                 style={{ width: `${uploadProgress}%` }}
//               />
//             </div>
//           )}

//           <button type="submit" className="submit-btn">
//             Submit Assignment
//           </button>
//         </form>

//         {message && <p className="message">{message}</p>}
//       </div>
//     </div>
//   );
// }
// AssignmentPage.jsx
import { useState, useEffect } from "react";
import "../App.css";

export default function AssignmentPage({ goHome }) {
  const [student, setStudent] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
  const [unit, setUnit] = useState("");
  const [comments, setComments] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setStudent({
        id: 1,
        name: "Pranavi Neeruganti",
        username: "pranavi123",
        registerNo: "21CSE045",
        year: "3rd Year",
        department: "CSE",
      });
      setAssignments([
        { id: 1, title: "Data Structures Assignment", dueDate: "2026-03-10" },
        { id: 2, title: "Operating Systems Assignment", dueDate: "2026-03-15" },
      ]);
    }, 500);
  }, []);

  const selectedAssignment = assignments.find(
    (a) => a.id === Number(selectedAssignmentId),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAssignmentId || !unit || !file) {
      setMessage("Please complete all required fields.");
      return;
    }
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setMessage("Assignment submitted successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (!student) return <div className="loading">Loading...</div>;

  return (
    <div className="assignment-page">
      <div className="top-header">
        <h2>Assignment Portal</h2>
        <button className="back-btn" onClick={goHome}>
          Back to Home
        </button>
      </div>

      <div className="assignment-content">
        {/* Student Info */}
        <div className="student-card card">
          <h3>Student Info</h3>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Username:</strong> {student.username}
          </p>
          <p>
            <strong>Register No:</strong> {student.registerNo}
          </p>
          <p>
            <strong>Year:</strong> {student.year}
          </p>
          <p>
            <strong>Department:</strong> {student.department}
          </p>
        </div>

        {/* Assignment Form */}
        <div className="form-card card">
          <h3>Submit Assignment</h3>
          <form onSubmit={handleSubmit}>
            <label>Select Assignment</label>
            <select
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
            >
              <option value="">-- Select Assignment --</option>
              {assignments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
            </select>

            {selectedAssignment && (
              <p className="due-date">
                <strong>Due Date:</strong> {selectedAssignment.dueDate}
              </p>
            )}

            <label>Select Unit</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="">-- Select Unit --</option>
              <option>Unit 1</option>
              <option>Unit 2</option>
              <option>Unit 3</option>
              <option>Unit 4</option>
              <option>Unit 5</option>
            </select>

            <label>Comments</label>
            <textarea
              rows="3"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />

            <label>Upload File</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {uploadProgress > 0 && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
