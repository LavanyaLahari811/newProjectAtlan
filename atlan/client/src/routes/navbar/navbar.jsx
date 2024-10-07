import "./navbar.scss";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "", { path: '/' });
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" style={{ color: "black", fontWeight: "500" }}>
            TravelMate
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/" style={{ color: "black", fontWeight: "500" }}>
            Home
          </Link>
          <Link to="/features" style={{ color: "black", fontWeight: "500" }}>
            Features
          </Link>
          <Link to="/about" style={{ color: "black", fontWeight: "500" }}>
            About
          </Link>

          {!cookies.access_token ? (
            <Link to="/auth" style={{ color: "black", fontWeight: "500" }}>
              Login/Signup
            </Link>
          ) : (
            <div className="dashboard-logout">
              <Link to="/dashboard" style={{ color: "black", fontWeight: "500" }}>
                Dashboard
              </Link>
              <button onClick={logout} id="logout_btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
