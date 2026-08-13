import { useEffect, useState } from "react";
import type { Mission } from "./types/Mission";
import Galaxy from "./components/Galaxy/Galaxy";
import "./App.css";

const API_URL = "http://localhost:5023";

function App() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/missions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        return response.json();
      })
      .then((data: Mission[]) => {
        setMissions(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error("Failed to load missions:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      {/* =========================
          SPACE BACKGROUND
      ========================== */}
      <Galaxy starCount={250} speed={0.1} />

      {/* =========================
          MISSION CONTROL
      ========================== */}
      <main className="mission-control">
        <header className="mission-header">
          <h1>🚀 Mission Control</h1>

          <p className="system-status">
            System Status:
            <span> 🟢 Operational</span>
          </p>
        </header>

        <section className="missions-section">
          <h2>Active Missions</h2>

          {loading && <p className="loading">Loading mission data...</p>}

          {error && (
            <p className="error">
              ❌ Failed to contact Mission Control API: {error}
            </p>
          )}

          {!loading && !error && missions.length === 0 && (
            <p className="empty">No missions detected.</p>
          )}

          <div className="missions">
            {missions.map((mission) => (
              <article key={mission.id} className="mission-card">
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
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
