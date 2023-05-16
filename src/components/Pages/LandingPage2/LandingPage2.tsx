import { LandingPageProps } from "../../../data/Interfaces";
import { ContinueWithGoogle } from "../../Items/ContinueWithGoogle/ContinueWithGoogle";
import "./LandingPage2.css";
import Man from '../../../data/images/oldman.png';

export const LandingPage2 = ({ logOut }: LandingPageProps) => {
  return (
    <div className="std-landingPage-container">
      <div className="std-landingPage-grid">
        <div className="std-landingPage-column std-landingPage-c1">
          <h1 className="std-landingPage-c1-h1">
            Build your projects with TaskWise
          </h1>
          <p className="std-landingPage-c1-h2">
            Start using our AI powered assistant to manage your tasks and
            collaborate with other users to create.
          </p>
          <div className="std-landingPage-signup-container">
            <input type="email" className="std-landingPage-c1-input" />
            <ContinueWithGoogle />
          </div>
        </div>
        <div className="std-landingPage-column std-landingPage-c2">
          <img src={Man} className="std-landingPage-image" />
        </div>
      </div>
      <div className="std-landingPage-wave">
        <svg
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,256L48,240C96,224,192,192,288,176C384,160,480,160,576,170.7C672,181,768,203,864,224C960,245,1056,267,1152,266.7C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
