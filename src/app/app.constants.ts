import { IssuePriority, IssueStatus } from './app.interfaces';

export const STATUSES: IssueStatus[] = [
  { name: 'Open', value: 0 },
  { name: 'In Progress', value: 1 },
  { name: 'Hold', value: 2 },
  { name: 'Done', value: 3 },
];

export const PRIORITIES: IssuePriority[] = [
  { name: 'Critical', value: 0, icon: 'arrow_upward' },
  { name: 'High', value: 1, icon: 'keyboard_arrow_up' },
  { name: 'Medium', value: 2, icon: 'keyboard_arrow_down' },
  { name: 'Low', value: 3, icon: 'arrow_downward' },
];
