import Galaxy from "../../components/Galaxy/Galaxy";
import astrocat from "../../assets/astrocat.png";
import pixelSpeech from "../../assets/pixelspeech.png";
import "./WelcomeScreen.css";

interface WelcomeScreenProps {
  onNext: () => void;
}

function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      <Galaxy starCount={250} speed={0.1} />

      <div className="welcome-content">
        <div
          className="speech-bubble"
          style={{ backgroundImage: `url(${pixelSpeech})` }}
        >
          <span className="speech-bubble-text">
            Welcome to Mission
            <br />
            Control by Sanny...
          </span>
        </div>

        <div className="astrocat-wrapper">
          <img
            src={astrocat}
            alt="Astro cat mascot"
            className="astrocat-float"
          />
        </div>

        <button className="pixel-btn" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
