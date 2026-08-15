import type { Mission } from "../../types/Mission";

interface MissionCardProps {
  mission: Mission;
  onDelete: (id: number) => void;
}

function MissionCard({ mission, onDelete }: MissionCardProps) {
  return (
    <article className="mission-card">
      <div className="mission-card-header">
        <h3>{mission.name}</h3>
        <span className="mission-id">
          MISSION-{mission.id.toString().padStart(3, "0")}
        </span>
      </div>

      <p className="mission-description">{mission.description}</p>

      <div className="mission-details">
        <div>
          <span className="label">Priority</span>
          <span className="value">{mission.priority}</span>
        </div>

        <div>
          <span className="label">Status</span>
          <span className="value">{mission.status}</span>
        </div>

        {mission.startDate && (
          <div>
            <span className="label">Start</span>
            <span className="value">
              {new Date(mission.startDate).toLocaleDateString()}
            </span>
          </div>
        )}

        {mission.targetDate && (
          <div>
            <span className="label">Target</span>
            <span className="value">
              {new Date(mission.targetDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <button
        className="mission-delete-btn"
        onClick={() => onDelete(mission.id)}
        aria-label={`Delete ${mission.name}`}
      >
        Abort Mission
      </button>
    </article>
  );
}

export default MissionCard;
