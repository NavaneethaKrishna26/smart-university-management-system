import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchAttendanceReport } from '../services/attendanceService';
import DatePicker from '../components/ui/DatePicker';
import Select from '../components/ui/Select';
import ErrorAlert from '../components/ui/ErrorAlert';
import Loader from '../components/ui/Loader';

function AdminDashboard() {
  const { token } = useAuth();
  const [classId, setClassId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // In real use, you would fetch classes for admin separately.
  const classesOptions = [{ value: '1', label: 'Class 1' }];

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    setReport(null);
    setLoading(true);
    try {
      const data = await fetchAttendanceReport({ classId, from, to }, token); // GET /api/admin/attendance/report[file:2]
      setReport(data);
    } catch (e) {
      setError('Failed to load attendance report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p className="muted">Generate attendance reports by class and date range.</p>
      <form className="form-inline" onSubmit={handleGenerate}>
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
          Generate
        </button>
      </form>
      {loading && <Loader />}
      <ErrorAlert message={error} />
      {report && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Total Classes</th>
                <th>Total Present</th>
                <th>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {report.students?.map((row) => (
                <tr key={row.studentId}>
                  <td>{row.studentName}</td>
                  <td>{row.totalClasses}</td>
                  <td>{row.totalPresent}</td>
                  <td>{row.attendancePercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
