import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/login?role=student">Student Portal</Link>
      <Link to="/login?role=faculty">Faculty Portal</Link>
    </nav>
  );
};

export default Navbar;
