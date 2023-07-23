import { Task, TaskTemplate } from '../models/task.interface';
import { TaskModel } from '../models/task.model';

export async function getTasks(): Promise<Task[]> {
  try {
    return await TaskModel.getTasks();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error('There is a problem to get tasks');
  }
}

export async function createTask(task: TaskTemplate): Promise<Task> {
  try {
    return await TaskModel.createTask(task);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error('There is a problem to create a task');
  }
}

export async function updateTask(taskId: string, task: TaskTemplate): Promise<Task> {
  try {
    const taskExists = await TaskModel.taskExists(taskId);

    if (!taskExists) throw new Error('Task not found');

    return await TaskModel.updateTask(taskId, task);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error('There is a problem to update a task');
  }
}

export async function deleteTask(taskId: string): Promise<boolean> {
  try {
    const taskExists = await TaskModel.taskExists(taskId);

    if (!taskExists) throw new Error('Task not found');

    return await TaskModel.deleteTask(taskId);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error('There is a problem to delet a task');
  }
}
