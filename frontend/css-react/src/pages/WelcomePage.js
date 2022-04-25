import phone from "../assets/phone.png";
import laptop from "../assets/laptop.png";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="main-content">
      <div className="full-page-section one">
        <div className="large-text">
          <div>Welcome to</div>
          <div>Crowdsource Sensors</div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
      <div className="full-page-section second">
        <div className="second-left">
          <div className="welcome-text-large">
            Crowdsource Senors is simple.
          </div>
          <div className="welcome-text-medium">
            Just upload a photo, write a quick description, and the image will
            plot itself on the map for others to see!
          </div>
          <div className="welcome-text-medium">
            Browse the map to see what's happening around you. You can even
            filter what you want to see based on categories and time!
          </div>
          <div className="welcome-text-medium">
            If you see a post you like, leave a comment.
          </div>
        </div>

        <div className="second-right">
          <div>
            <img className="phone-image" src={phone} alt="" />
          </div>
          <div>
            <img className="laptop-image" src={laptop} alt="" />
          </div>
        </div>
      </div>
      <div className="welcome-page-third">
        <div>
          Already have an account? Log in! If not, sign up and begin exploring
          now!
        </div>

        <div className="button-container welcome-buttons">
          <Link className="small-button welcome-button" to="/login">
            Log in
          </Link>
          <Link className="small-button welcome-button" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
