export interface Task {
  readonly id: string;
  title: string;
  status: 'pending' | 'completed';
}
