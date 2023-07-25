import { db } from '../config/firebase';
import { Task, TaskTemplate } from './task.interface';

export const TASK_COLLECTION_REF = db.collection('tasks');

export class TaskModel {
  private _taskCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(
    taskCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
  ) {
    this._taskCollection = taskCollection;
  }

  async getTasks(): Promise<Task[]> {
    try {
      const tasksSnapshot = await this._taskCollection.get();

      const tasks = tasksSnapshot.docs.map((doc): Task => {
        return { id: doc.id, ...doc.data() } as Task;
      });

      return Promise.resolve(tasks);
    } catch {
      return Promise.reject();
    }
  }

  async createTask(task: TaskTemplate): Promise<Task> {
    try {
      const taskRef = await this._taskCollection.add(task);

      const taskSnapshot = await taskRef.get();

      console.log(taskSnapshot.data());

      return Promise.resolve({ id: taskSnapshot.id, ...taskSnapshot.data() } as Task);
    } catch {
      return Promise.reject();
    }
  }

  async updateTask(taskId: string, task: TaskTemplate): Promise<Task> {
    try {
      await this._taskCollection.doc(taskId).set(task);

      const taskSnapshot = await this._taskCollection.doc(taskId).get();

      return Promise.resolve({ id: taskSnapshot.id, ...taskSnapshot.data() } as Task);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteTask(taskId: string): Promise<boolean> {
    try {
      await this._taskCollection.doc(taskId).delete();

      return Promise.resolve(true);
    } catch {
      return Promise.reject();
    }
  }

  async taskExists(taskId: string): Promise<boolean> {
    try {
      const taskRef = this._taskCollection.doc(taskId);

      const taskSnapshot = await taskRef.get();

      if (!taskSnapshot.exists) return Promise.resolve(false);

      return Promise.resolve(true);
    } catch {
      return Promise.reject();
    }
  }
}
