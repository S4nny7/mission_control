export interface Mission {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  startDate: string | null;
  targetDate: string | null;
  createdAt: string;
}