import astronautYay from "../../assets/astronaut_yay.png";

interface MissionHeaderProps {
  isOperational: boolean;
}

function MissionHeader({ isOperational }: MissionHeaderProps) {
  return (
    <header className="mission-header">
      <h1>
        <img
          src={astronautYay}
          alt="Astronaut mascot"
          className="header-icon"
        />
        Mission Control
      </h1>

      <p className="system-status">
        System Status:
        <span> {isOperational ? "🟢 Operational" : "🔴 Offline"}</span>
      </p>
    </header>
  );
}

export default MissionHeader;
