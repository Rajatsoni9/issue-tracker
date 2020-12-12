export interface Issue {
  id: number;
  summary: string;
  description: string;
  createdAt: number;
  lastUpdated: number;
  status: {
    name: string,
    value: number,
  };
  priority: {
    name: string;
    value: number;
  };
}
