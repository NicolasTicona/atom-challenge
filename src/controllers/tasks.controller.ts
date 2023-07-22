import { Task, TaskStatus, TaskTemplate } from '../models/task.model';

export async function getTasks(): Promise<Task[]> {
  try {
    const tasks: Task[] = [
      {
        id: 0,
        title: 'Task one',
        description: 'Lorem ipsum dolor sit amet',
        status: TaskStatus.Pending,
      },
      {
        id: 1,
        title: 'Task two',
        description: 'Lorem ipsum dolor sit amet',
        status: TaskStatus.Completed,
      },
    ];
    return Promise.resolve(tasks);
  } catch {
    throw new Error('There is a problem to get tasks');
  }
}

export async function createTask(task: TaskTemplate): Promise<Task> {
  try {
    return Promise.resolve({ id: 10, ...task });
  } catch {
    throw new Error('There is a problem to create a task');
  }
}

export async function updateTask(taskId: number, task: TaskTemplate): Promise<Task> {
  try {
    return Promise.resolve({ id: 10, ...task });
  } catch {
    throw new Error('There is a problem to update a task');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteTask(taskId: number): Promise<boolean> {
  try {
    return Promise.resolve(true);
  } catch {
    throw new Error('There is a problem to delete a task');
  }
}
