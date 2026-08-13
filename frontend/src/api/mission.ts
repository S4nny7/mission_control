import type { Mission } from "../types/Mission";

const API_URL = import.meta.env.VITE_API_URL;

export async function getMissions(): Promise<Mission[]> {
  const response = await fetch(`${API_URL}/api/missions`);

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  return response.json();
}