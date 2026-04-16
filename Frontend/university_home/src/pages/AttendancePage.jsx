import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchFacultyClasses,
  fetchStudentsByClass,
  markAttendance,
} from "../services/attendanceService";
import ClassSelector from "../components/attendance/ClassSelector";
import DatePicker from "../components/ui/DatePicker";
import StudentAttendanceTable from "../components/attendance/StudentAttendanceTable";
import Loader from "../components/ui/Loader";
import ErrorAlert from "../components/ui/ErrorAlert";

function AttendancePage() {
  const { token } = useAuth();
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadClasses() {
      try {
        const data = await fetchFacultyClasses(token); // GET /api/faculty/classes[file:2]
        if (mounted) setClasses(data || []);
      } catch {
        if (mounted) setError("Failed to load classes");
      } finally {
        if (mounted) setLoadingClasses(false);
      }
    }
    loadClasses();
    return () => {
      mounted = false;
    };
  }, [token]);

  useEffect(() => {
    if (!classId) {
      setStudents([]);
      setRecords({});
      return;
    }
    let mounted = true;
    setLoadingStudents(true);
    setError("");
    async function loadStudents() {
      try {
        const data = await fetchStudentsByClass(classId, token); // GET /api/classes/{id}/students[file:2]
        if (!mounted) return;
        setStudents(data || []);
        const initial = {};
        (data || []).forEach((s) => {
          initial[s.id] = "PRESENT";
        });
        setRecords(initial);
      } catch {
        if (mounted) setError("Failed to load students");
      } finally {
        if (mounted) setLoadingStudents(false);
      }
    }
    loadStudents();
    return () => {
      mounted = false;
    };
  }, [classId, token]);

  const handleToggle = (studentId, status) => {
    setRecords((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccessMsg("");
    setSaving(true);
    try {
      const payload = {
        classId: Number(classId),
        date,
        records: Object.entries(records).map(([studentId, status]) => ({
          studentId: Number(studentId),
          status,
        })),
      };
      await markAttendance(payload, token); // POST /api/attendance[file:2]
      setSuccessMsg("Attendance saved successfully.");
    } catch {
      setError("Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <h1>Mark Attendance</h1>
      <p className="muted">Select a class and date, then mark each student.</p>
      {loadingClasses && <Loader />}
      <ErrorAlert message={error} />
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <div className="form-inline">
        <ClassSelector
          classes={classes}
          value={classId}
          onChange={setClassId}
        />
        <DatePicker label="Date" value={date} onChange={setDate} />
      </div>
      {loadingStudents && <Loader />}
      {!loadingStudents && classId && (
        <>
          <StudentAttendanceTable
            students={students}
            records={records}
            onToggle={handleToggle}
          />
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={saving || students.length === 0}
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        </>
      )}
    </div>
  );
}

export default AttendancePage;
