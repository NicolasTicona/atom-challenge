type TaskStatus = 'completed' | 'pending';

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
}
