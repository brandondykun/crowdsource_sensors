import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import apiCalls from "../apis/apiCalls";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const response = await apiCalls.logOut();
    if (response) {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="nav-text">Crowdsource Sensors</div>
      <div activeclassname="active" className="nav-link-contianer">
        <div className="link-container">
          <NavLink className="navbar-link" to="/">
            <i id="info-icon" className="fa-solid fa-circle-info"></i>
            <span className="nav-button-text">Info</span>
          </NavLink>
        </div>
        {user && (
          <div className="link-container">
            <NavLink className="navbar-link" to="/home">
              <i id="home-icon" className="fa-solid fa-house-user"></i>
              <span className="nav-button-text">Home</span>
            </NavLink>
          </div>
        )}
        {user && (
          <div className="link-container">
            <NavLink className="navbar-link" to="/add-post">
              <i id="add-post-icon" className="fa-solid fa-upload"></i>
              <span className="nav-button-text">Add Post</span>
            </NavLink>
          </div>
        )}
        {user && (
          <div className="link-container">
            <NavLink className="navbar-link" to="/map">
              <i id="map-icon" className="fa-solid fa-map-location-dot"></i>
              <span className="nav-button-text">Map</span>
            </NavLink>
          </div>
        )}
        {user && (
          <div className="link-container">
            <NavLink className="navbar-link" to="/news">
              <i id="news-icon" className="fa-solid fa-newspaper"></i>
              <span className="nav-button-text">News</span>
            </NavLink>
          </div>
        )}
        {!user && (
          <div className="link-container">
            <NavLink className="navbar-link" to="/login">
              <i
                id="login-icon"
                className="fa-solid fa-arrow-right-to-bracket"
              ></i>
              <span className="nav-button-text">Log In</span>
            </NavLink>
          </div>
        )}
        {!user && (
          <div className="link-container">
            <NavLink className="navbar-link" to="/signup">
              <i id="signup-icon" className="fa-solid fa-user-plus"></i>
              <span className="nav-button-text">Sign Up</span>
            </NavLink>
          </div>
        )}
        {user && (
          <div className="link-container">
            <NavLink
              onClick={handleLogOut}
              className="navbar-link"
              to="/logout"
            >
              <i
                id="logout-icon"
                className="fa-solid fa-arrow-right-from-bracket"
              ></i>
              <span className="nav-button-text">Log Out</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
