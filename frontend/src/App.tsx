import Galaxy from "./components/Galaxy/Galaxy";
import MissionHeader from "./components/MissionHeader/MissionHeader";
import MissionForm from "./components/MissionForm/MissionForm";
import MissionList from "./components/MissionCard/MissionList";
import { useMissions } from "./hooks/useMissions";
import LoadingScreen from "./pages/LoadingScreen/LoadingScreen";
import { useState, useEffect } from "react";
import WelcomeScreen from "./pages/WelcomeScreen/WelcomeScreen";
import "./App.css";

const SPLASH_DURATION_MS = 4000;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const { missions, loading, error, createMission, deleteMission } =
    useMissions();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <LoadingScreen />;
  }

  if (showWelcome) {
    return <WelcomeScreen onNext={() => setShowWelcome(false)} />;
  }

  return (
    <div className="app">
      <Galaxy starCount={250} speed={0.1} />

      <main className="mission-control">
        <MissionHeader isOperational={!error} />

        <section className="mission-form-section">
          <MissionForm
            title="Launch New Mission"
            submitLabel="🚀 Launch Mission"
            priorities={["Low", "Medium", "High", "Critical"]}
            statuses={["Planned", "Active", "Completed", "Aborted"]}
            onSubmit={createMission}
          />
        </section>

        <section className="missions-section">
          <h2>Active Missions</h2>
          <MissionList
            missions={missions}
            loading={loading}
            error={error}
            onDelete={deleteMission}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
