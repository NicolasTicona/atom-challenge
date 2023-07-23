export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
}

export interface TaskTemplate {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface Task extends TaskTemplate {
  id: string;
}
