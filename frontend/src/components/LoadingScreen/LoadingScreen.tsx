import Galaxy from "../Galaxy/Galaxy";
import planetLoader from "../../assets/planet_loader.gif";
import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <Galaxy starCount={250} speed={0.1} />
      <div className="loading-content">
        <img
          src={planetLoader}
          alt="Loading Planet"
          className="loading-planet"
        />

        <h1 className="loading-title">Mission Control</h1>
        <p className="loading-subtitle">Initialising Systems...</p>

        <div className="pixel-bar">
          <div className="pixel-bar-fill" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
