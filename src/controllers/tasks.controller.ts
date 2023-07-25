import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';
import { validateStatus } from '../utils/validate-task-status.util';

export class TasksController {
  private _taskModel: TaskModel;

  constructor(taskModel: TaskModel) {
    this._taskModel = taskModel;
  }

  async getTasks(req: Request, res: Response): Promise<void | Response> {
    try {
      const tasks = await this._taskModel.getTasks();
      res.json(tasks);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async createTask(req: Request, res: Response): Promise<void | Response> {
    try {
      const { title, description, status } = req.body;

      if (!title || !description || !status) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      if (!validateStatus(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const task = this._taskModel.createTask({ title, description, status });

      res.json({
        message: 'Task created',
        task,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void | Response> {
    try {
      const taskId = req.params.taskId;
      const { title, description, status } = req.body;

      if (!taskId || !title || !description || !status) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      if (!validateStatus(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const taskExists = this._taskModel.taskExists(taskId);

      if (!taskExists) {
        return res.status(404).json({ message: 'Task not found' });
      }

      const task = this._taskModel.updateTask(taskId, { title, description, status });

      res.json({
        message: 'Task updated',
        task,
      });
    } catch (error) {
      if (error instanceof Error) return res.status(500).json({ message: error.message });

      res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void | Response> {
    try {
      const taskId = req.params.taskId;

      if (!taskId) {
        return res.status(400).json({ message: 'Invalid task id' });
      }

      const taskExists = this._taskModel.taskExists(taskId);

      if (!taskExists) {
        return res.status(404).json({ message: 'Task not found' });
      }

      const taskDeleted = this._taskModel.deleteTask(taskId);

      if (!taskDeleted) {
        throw new Error();
      }

      res.json({
        message: 'Task deleted',
      });
    } catch (error) {
      if (error instanceof Error) return res.status(500).json({ message: error.message });

      res.status(500).json({ message: 'Something went wrong!' });
    }
  }
}
