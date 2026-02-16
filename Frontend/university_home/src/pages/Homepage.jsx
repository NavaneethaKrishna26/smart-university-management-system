import React from "react";

export default function HomePage() {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ color: "white" }}>🎓 University</h2>
        <ul style={styles.menu}>
          <li>Dashboard</li>
          <li>Students</li>
          <li>Faculty</li>
          <li>Courses</li>
          <li>Departments</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <h1>University Dashboard</h1>

        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3>Total Students</h3>
            <p>1200</p>
          </div>

          <div style={styles.card}>
            <h3>Total Faculty</h3>
            <p>85</p>
          </div>

          <div style={styles.card}>
            <h3>Total Courses</h3>
            <p>45</p>
          </div>

          <div style={styles.card}>
            <h3>Departments</h3>
            <p>10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1e293b",
    padding: "20px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    marginTop: "30px",
    color: "white",
    lineHeight: "2.5",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f1f5f9",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginTop: "30px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};
