import React from 'react';

function StudentAttendanceTable({ students, records, onToggle }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => {
            const status = records[s.id] || 'PRESENT';
            const present = status === 'PRESENT';
            return (
              <tr key={s.id}>
                <td>{s.rollNumber}</td>
                <td>{s.name}</td>
                <td>
                  <button
                    type="button"
                    className={`toggle-pill ${present ? 'on' : 'off'}`}
                    onClick={() => onToggle(s.id, present ? 'ABSENT' : 'PRESENT')}
                  >
                    {present ? 'Present' : 'Absent'}
                  </button>
                </td>
              </tr>
            );
          })}
          {students.length === 0 && (
            <tr>
              <td colSpan={3} className="muted">
                No students in this class.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendanceTable;
