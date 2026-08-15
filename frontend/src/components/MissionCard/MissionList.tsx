import type { Mission } from "../../types/Mission";
import MissionCard from "../MissionCard/MissionCard";

interface MissionListProps {
  missions: Mission[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => void;
}

function MissionList({ missions, loading, error, onDelete }: MissionListProps) {
  if (loading) return <p className="loading">Loading mission data...</p>;

  if (error) {
    return (
      <p className="error">❌ Failed to contact Mission Control API: {error}</p>
    );
  }

  if (missions.length === 0)
    return <p className="empty">No missions detected.</p>;

  return (
    <div className="missions">
      {missions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default MissionList;
