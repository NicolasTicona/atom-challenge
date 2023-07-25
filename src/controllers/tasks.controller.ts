import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';
import { validateStatus } from '../utils/validate-task-status.util';

export class TasksController {
  private _taskModel: TaskModel;

  constructor(taskModel: TaskModel) {
    this._taskModel = taskModel;
  }

  getTasks = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const tasks = await this._taskModel.getTasks();
      res.json(tasks);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: 'Something went wrong!' });
    }
  };

  createTask = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { title, description, status } = req.body;

      if (!title || !description || !status) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      if (!validateStatus(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const task = await this._taskModel.createTask({ title, description, status });

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
  };

  updateTask = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const taskId = req.params.taskId;
      const { title, description, status } = req.body;

      if (!taskId || !title || !description || !status) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      if (!validateStatus(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const taskExists = await this._taskModel.taskExists(taskId);

      if (!taskExists) {
        return res.status(404).json({ message: 'Task not found' });
      }

      const task = await this._taskModel.updateTask(taskId, { title, description, status });

      res.json({
        message: 'Task updated',
        task,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return res.status(500).json({ message: error.message });

      res.status(500).json({ message: 'Something went wrong!' });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const taskId = req.params.taskId;

      if (!taskId) {
        return res.status(400).json({ message: 'Invalid task id' });
      }

      const taskExists = await this._taskModel.taskExists(taskId);

      if (!taskExists) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await this._taskModel.deleteTask(taskId);

      res.json({
        message: 'Task deleted',
      });
    } catch (error) {
      if (error instanceof Error) return res.status(500).json({ message: error.message });

      res.status(500).json({ message: 'Something went wrong!' });
    }
  };
}
