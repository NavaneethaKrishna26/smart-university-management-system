import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchAttendanceByRange } from "../services/attendanceService";
import DatePicker from "../components/ui/DatePicker";
import Select from "../components/ui/Select";
import Loader from "../components/ui/Loader";
import ErrorAlert from "../components/ui/ErrorAlert";

function AttendanceHistoryPage() {
  const { token } = useAuth();
  const [classId, setClassId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // For simplicity, using a static class list; in production fetch from backend for faculty.[file:2]
  const classesOptions = [{ value: "1", label: "Class 1" }];

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setRecords([]);
    setLoading(true);
    try {
      const data = await fetchAttendanceByRange({ classId, from, to }, token); // GET /api/attendance[file:2]
      setRecords(data || []);
    } catch {
      setError("Failed to load attendance history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Attendance History</h1>
      <p className="muted">View attendance records for a specific period.</p>
      <form className="form-inline" onSubmit={handleSearch}>
        <Select
          label="Class"
          options={classesOptions}
          value={classId}
          onChange={setClassId}
          placeholder="Select class"
        />
        <DatePicker label="From" value={from} onChange={setFrom} />
        <DatePicker label="To" value={to} onChange={setTo} />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!classId || !from || !to || loading}
        >
          Search
        </button>
      </form>
      {loading && <Loader />}
      <ErrorAlert message={error} />
      {!loading && records.length > 0 && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Class</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.sessionId}>
                  <td>{r.date}</td>
                  <td>{r.className}</td>
                  <td>{r.presentCount}</td>
                  <td>{r.absentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && records.length === 0 && (
        <p className="muted">No records for selected range.</p>
      )}
    </div>
  );
}

export default AttendanceHistoryPage;
