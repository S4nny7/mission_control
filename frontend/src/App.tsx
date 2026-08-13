import { useEffect, useState } from "react";

import type { Mission } from "./types/Mission";

import Galaxy from "./components/Galaxy/Galaxy";

import MissionList from "./components/MissionCard/MissionList";

import MissionForm, {
  type MissionFormData,
} from "./components/MissionForm/MissionForm";

import "./App.css";

const API_URL = "http://localhost:5023";

function App() {
  const [missions, setMissions] = useState<Mission[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /*
   * Load missions from the API
   */
  useEffect(() => {
    async function loadMissions() {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/missions`);

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data: Mission[] = await response.json();

        setMissions(data);

        setError(null);
      } catch (error) {
        console.error("Failed to load missions:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load missions.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadMissions();
  }, []);

  /*
   * Create a new mission
   */
  async function handleMissionCreated(data: MissionFormData) {
    const response = await fetch(`${API_URL}/api/missions`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: data.name,
        description: data.description,
        status: data.status,
        priority: data.priority,

        startDate: data.startDate || null,

        targetDate: data.targetDate || null,
      }),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const newMission: Mission = await response.json();

    /*
     * Add the newly-created mission
     * to the existing list.
     */
    setMissions((currentMissions) => [...currentMissions, newMission]);
  }

  return (
    <div className="app">
      {/* Space background */}

      <Galaxy starCount={250} speed={0.1} />

      {/* Mission Control */}

      <main className="mission-control">
        {/* Header */}

        <header className="mission-header">
          <h1>🚀 Mission Control</h1>

          <p className="system-status">
            System Status:
            <span> 🟢 Operational</span>
          </p>
        </header>

        {/* Create Mission */}

        <section className="mission-form-section">
          <MissionForm
            title="Launch New Mission"
            submitLabel="🚀 Launch Mission"
            priorities={["Low", "Medium", "High", "Critical"]}
            statuses={["Planned", "Active", "Completed", "Aborted"]}
            onSubmit={handleMissionCreated}
          />
        </section>

        {/* Mission List */}

        <section className="missions-section">
          <h2>Active Missions</h2>

          <MissionList missions={missions} loading={loading} error={error} />
        </section>
      </main>
    </div>
  );
}

export default App;
