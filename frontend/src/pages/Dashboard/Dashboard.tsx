import type { Mission } from "../../types/Mission";
import "./Dashboard.css";

interface DashboardProps {
  missions: Mission[];
  onLaunchMission: () => void;
}

function Dashboard({ missions, onLaunchMission }: DashboardProps) {
  const totalMissions = missions.length;

  const activeMissions = missions.filter(
    (mission) => mission.status === "Active",
  ).length;

  const completedMissions = missions.filter(
    (mission) => mission.status === "Completed",
  ).length;

  const criticalMissions = missions.filter(
    (mission) => mission.priority === "Critical",
  ).length;

  const highPriorityMissions = missions.filter(
    (mission) => mission.priority === "High",
  ).length;

  const priorityMissions = criticalMissions + highPriorityMissions;

  // =========================
  // OVERDUE MISSIONS
  // =========================

  const overdueMissions = missions.filter((mission) => {
    if (!mission.targetDate) {
      return false;
    }

    // Completed and aborted missions aren't considered overdue
    if (mission.status === "Completed" || mission.status === "Aborted") {
      return false;
    }

    return new Date(mission.targetDate) < new Date();
  }).length;

  // =========================
  // RECENT MISSIONS
  // =========================

  const recentMissions = [...missions]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  // =========================
  // DATE FORMATTER
  // =========================

  const formatDate = (date: string | null) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <main className="dashboard">
      {/* =========================
          HEADER
      ========================= */}

      <header className="dashboard-header">
        <div className="dashboard-title">
          <div className="dashboard-icon">🛰️</div>

          <div>
            <p className="dashboard-eyebrow">
              MISSION CONTROL // COMMAND CENTRE
            </p>

            <h1>Mission Dashboard</h1>

            <p className="dashboard-subtitle">
              Monitor mission activity and system operations.
            </p>
          </div>
        </div>

        <button className="launch-button" onClick={onLaunchMission}>
          🚀 Launch Mission
        </button>
      </header>

      {/* =========================
          SYSTEM STATUS
      ========================= */}

      <section className="system-status-bar">
        <div className="system-status-indicator">
          <span className="status-dot" />

          <span>SYSTEM OPERATIONAL</span>
        </div>

        <span className="status-divider">//</span>

        <span>
          {totalMissions} MISSION
          {totalMissions !== 1 ? "S" : ""} REGISTERED
        </span>
      </section>

      {/* =========================
          STATISTICS
      ========================= */}

      <section className="dashboard-stats">
        {/* TOTAL */}

        <div className="stat-card total-card">
          <div className="stat-card-top">
            <span className="stat-label">TOTAL MISSIONS</span>

            <span className="stat-icon">◉</span>
          </div>

          <div className="stat-number">{totalMissions}</div>

          <div className="stat-description">All registered missions</div>
        </div>

        {/* ACTIVE */}

        <div className="stat-card active-card">
          <div className="stat-card-top">
            <span className="stat-label">ACTIVE</span>

            <span className="stat-icon">●</span>
          </div>

          <div className="stat-number">{activeMissions}</div>

          <div className="stat-description">Missions currently active</div>
        </div>

        {/* COMPLETED */}

        <div className="stat-card completed-card">
          <div className="stat-card-top">
            <span className="stat-label">COMPLETED</span>

            <span className="stat-icon">✓</span>
          </div>

          <div className="stat-number">{completedMissions}</div>

          <div className="stat-description">Successfully completed</div>
        </div>

        {/* OVERDUE */}

        <div className="stat-card overdue-card">
          <div className="stat-card-top">
            <span className="stat-label">OVERDUE</span>

            <span className="stat-icon">!</span>
          </div>

          <div className="stat-number">{overdueMissions}</div>

          <div className="stat-description">Require immediate attention</div>
        </div>

        {/* PRIORITY */}

        <div className="stat-card priority-card">
          <div className="stat-card-top">
            <span className="stat-label">HIGH PRIORITY</span>

            <span className="stat-icon">◆</span>
          </div>

          <div className="stat-number">{priorityMissions}</div>

          <div className="stat-description">Critical and high priority</div>
        </div>
      </section>

      {/* =========================
          LOWER DASHBOARD
      ========================= */}

      <section className="dashboard-grid">
        {/* =========================
            PRIORITY PANEL
        ========================= */}

        <div className="dashboard-panel priority-panel">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">TELEMETRY</span>

              <h2>Priority Status</h2>
            </div>

            <span className="panel-code">PRI-01</span>
          </div>

          <div className="priority-list">
            {/* CRITICAL */}

            <div className="priority-row">
              <div className="priority-name">
                <span className="priority-indicator critical" />

                <span>Critical</span>
              </div>

              <span className="priority-count">{criticalMissions}</span>
            </div>

            {/* HIGH */}

            <div className="priority-row">
              <div className="priority-name">
                <span className="priority-indicator high" />

                <span>High</span>
              </div>

              <span className="priority-count">{highPriorityMissions}</span>
            </div>

            {/* MEDIUM */}

            <div className="priority-row">
              <div className="priority-name">
                <span className="priority-indicator medium" />

                <span>Medium</span>
              </div>

              <span className="priority-count">
                {
                  missions.filter((mission) => mission.priority === "Medium")
                    .length
                }
              </span>
            </div>

            {/* LOW */}

            <div className="priority-row">
              <div className="priority-name">
                <span className="priority-indicator low" />

                <span>Low</span>
              </div>

              <span className="priority-count">
                {
                  missions.filter((mission) => mission.priority === "Low")
                    .length
                }
              </span>
            </div>
          </div>
        </div>

        {/* =========================
            RECENT MISSIONS
        ========================= */}

        <div className="dashboard-panel recent-panel">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">MISSION LOG</span>

              <h2>Recent Missions</h2>
            </div>

            <span className="panel-code">LOG-05</span>
          </div>

          <div className="recent-missions">
            {recentMissions.length === 0 ? (
              <div className="no-missions">NO MISSION DATA AVAILABLE</div>
            ) : (
              recentMissions.map((mission) => (
                <div className="recent-mission" key={mission.id}>
                  <div className="recent-mission-main">
                    <h3>{mission.name}</h3>

                    <span className="recent-mission-id">
                      MISSION-
                      {String(mission.id).padStart(3, "0")}
                    </span>
                  </div>

                  <div className="recent-mission-details">
                    <span
                      className={`mission-status status-${mission.status.toLowerCase()}`}
                    >
                      {mission.status}
                    </span>

                    <span>Target: {formatDate(mission.targetDate)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* =========================
          LAUNCH PANEL
      ========================= */}

      <section className="launch-panel">
        <div className="launch-panel-content">
          <span className="panel-eyebrow">COMMAND PROTOCOL</span>

          <h2>Ready to launch a new mission?</h2>

          <p>
            Configure mission parameters and deploy a new operation to the
            mission registry.
          </p>
        </div>

        <button className="launch-panel-button" onClick={onLaunchMission}>
          🚀 Launch New Mission
        </button>
      </section>
    </main>
  );
}

export default Dashboard;
