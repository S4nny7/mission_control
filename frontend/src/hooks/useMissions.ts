import { useEffect, useState, useCallback } from "react";
import type { Mission } from "../types/Mission";
import type { MissionFormData } from "../components/MissionForm/MissionForm";

const API_URL = "http://localhost:5023";

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMissions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/missions`);
      if (!response.ok) throw new Error(`API returned ${response.status}`);

      const data: Mission[] = await response.json();
      setMissions(data);
      setError(null);
    } catch (err) {
      console.error("Failed to load missions:", err);
      setError(err instanceof Error ? err.message : "Failed to load missions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMissions();
  }, [loadMissions]);

  async function createMission(data: MissionFormData) {
    const response = await fetch(`${API_URL}/api/missions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        status: data.status,
        priority: data.priority,
        startDate: data.startDate || null,
        targetDate: data.targetDate || null,
      }),
    });

    if (!response.ok) throw new Error(`API returned ${response.status}`);

    const newMission: Mission = await response.json();
    setMissions((current) => [...current, newMission]);
  }


  async function deleteMission(id: number) {
    const response = await fetch(`${API_URL}/api/missions/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error(`API returned ${response.status}`);
        setMissions((current) => current.filter((mission) => mission.id !== id));
        }

  async function updateMissionStatus(id: number, status:  Mission["status"]) {
    const mission = missions.find((m) => m.id == id);
    if (!mission) return;

    const response  = await fetch(`${API_URL}/api/missions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({...mission, status}),
    
  });
  if (!response.ok) throw new Error(`API returned ${response.status}`);
  const updatedMission: Mission = await response.json();
  setMissions((current) =>
  current.map((m) => (m.id === id ? updatedMission : m))
);
}

return { missions, loading, error, createMission, deleteMission, updateMissionStatus };
}
