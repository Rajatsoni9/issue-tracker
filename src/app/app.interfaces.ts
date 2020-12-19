export interface Issue {
  id: number;
  summary: string;
  description: string;
  createdAt: number;
  lastUpdated: number;
  status: IssueStatus;
  priority: IssuePriority;
}

export interface IssueStatus {
  name: 'Open' | 'In Progress' | 'Hold' | 'Done';
  value: number;
}
export interface IssuePriority {
  name: 'Critical' | 'High' | 'Medium' | 'Low';
  value: number;
  icon: string;
}
