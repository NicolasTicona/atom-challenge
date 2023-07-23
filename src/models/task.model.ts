import { db } from '../config/firebase';
import { Task, TaskTemplate } from './task.interface';

const taskCollection = db.collection('tasks');

export abstract class TaskModel {
  static async getTasks(): Promise<Task[]> {
    try {
      const tasksSnapshot = await taskCollection.get();

      const tasks = tasksSnapshot.docs.map((doc): Task => {
        return { id: doc.id, ...doc.data() } as Task;
      });

      return Promise.resolve(tasks);
    } catch {
      return Promise.reject();
    }
  }

  static async createTask(task: TaskTemplate): Promise<Task> {
    try {
      const taskRef = await taskCollection.add(task);

      const taskSnapshot = await taskRef.get();

      return Promise.resolve({ id: taskSnapshot.id, ...taskSnapshot.data() } as Task);
    } catch {
      return Promise.reject();
    }
  }

  static async updateTask(taskId: string, task: TaskTemplate): Promise<Task> {
    try {
      await taskCollection.doc(taskId).set(task);

      const taskSnapshot = await taskCollection.doc(taskId).get();

      return Promise.resolve({ id: taskSnapshot.id, ...taskSnapshot.data() } as Task);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteTask(taskId: string): Promise<boolean> {
    try {
      await taskCollection.doc(taskId).delete();

      return Promise.resolve(true);
    } catch {
      return Promise.reject();
    }
  }

  static async taskExists(taskId: string): Promise<boolean> {
    try {
      const taskRef = taskCollection.doc(taskId);

      const taskSnapshot = await taskRef.get();

      if (!taskSnapshot.exists) return Promise.resolve(false);

      return Promise.resolve(true);
    } catch {
      return Promise.reject();
    }
  }
}
