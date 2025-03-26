import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Ensure this file exists

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="left-nav">
        <Link to="/" className="brand">
          Task Manager
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
