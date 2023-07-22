import { TaskStatus } from '../models/task.model';

export function validateStatus(status: string): boolean {
  return (Object.values(TaskStatus) as string[]).includes(status);
}
