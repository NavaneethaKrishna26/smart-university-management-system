import React, { useState } from "react";
//import { useAuth } from '../context/AuthContext';
import DatePicker from "../components/ui/DatePicker";
import Select from "../components/ui/Select";
import Loader from "../components/ui/Loader";

function AdminDashboard() {
  const [classId, setClassId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const classes = [
    { value: "1", label: "CS101 - Web Development" },
    { value: "2", label: "CS201 - Data Structures" },
  ];

  const generateReport = async () => {
    setLoading(true);
    setTimeout(() => {
      setReport({
        className:
          classes.find((c) => c.value === classId)?.label || "Selected Class",
        period: `${from} to ${to}`,
        totalClasses: 15,
        totalPresent: 420,
        avgAttendance: "93%",
        students: [
          { name: "John Doe", present: 14, percentage: "93%" },
          { name: "Jane Smith", present: 13, percentage: "87%" },
          { name: "Mike Johnson", present: 15, percentage: "100%" },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="page">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Generate attendance reports and system overview</p>
      </div>

      <section className="report-section">
        <h2>Generate Attendance Report</h2>
        <div className="report-form">
          <Select
            label="Select Class"
            options={classes}
            value={classId}
            onChange={setClassId}
          />
          <DatePicker label="From Date" value={from} onChange={setFrom} />
          <DatePicker label="To Date" value={to} onChange={setTo} />
          <button
            className="btn btn-primary"
            onClick={generateReport}
            disabled={!classId || !from || !to || loading}
          >
            {loading ? <Loader size="sm" /> : "Generate Report"}
          </button>
        </div>
      </section>

      {report && (
        <section className="report-results">
          <div className="report-summary">
            <h3>{report.className}</h3>
            <p className="report-period">{report.period}</p>
            <div className="summary-stats">
              <div className="summary-stat">
                <div className="stat-number">{report.totalClasses}</div>
                <div>Total Classes</div>
              </div>
              <div className="summary-stat">
                <div className="stat-number">{report.totalPresent}</div>
                <div>Total Present</div>
              </div>
              <div className="summary-stat highlight">
                <div className="stat-number">{report.avgAttendance}</div>
                <div>Avg Attendance</div>
              </div>
            </div>
          </div>

          <div className="students-table">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Present</th>
                  <th>Attendance %</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {report.students.map((student, i) => (
                  <tr key={i}>
                    <td>{student.name}</td>
                    <td>
                      {student.present}/{report.totalClasses}
                    </td>
                    <td>
                      <span className="badge success">
                        {student.percentage}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="report-actions">
            <button className="btn btn-outline">Download PDF</button>
            <button className="btn btn-primary">Export CSV</button>
            <button className="btn btn-ghost" onClick={() => setReport(null)}>
              New Report
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;
