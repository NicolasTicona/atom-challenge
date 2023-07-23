import { TaskStatus } from '../models/task.interface';

export function validateStatus(status: string): boolean {
  return (Object.values(TaskStatus) as string[]).includes(status);
}
