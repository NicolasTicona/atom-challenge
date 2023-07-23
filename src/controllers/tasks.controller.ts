import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';
import { validateStatus } from '../utils/validate-task-status.util';

export async function getTasks(req: Request, res: Response): Promise<void | Response> {
  try {
    const tasks = await TaskModel.getTasks();
    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: 'Something went wrong!' });
  }
}

export async function createTask(req: Request, res: Response): Promise<void | Response> {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    if (!validateStatus(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const task = await TaskModel.createTask({ title, description, status });

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

export async function updateTask(req: Request, res: Response): Promise<void | Response> {
  try {
    const taskId = req.params.taskId;
    const { title, description, status } = req.body;

    if (!taskId || !title || !description || !status) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    if (!validateStatus(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const taskExists = await TaskModel.taskExists(taskId);

    if (!taskExists) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = await TaskModel.updateTask(taskId, { title, description, status });

    res.json({
      message: 'Task updated',
      task,
    });
  } catch (error) {
    if (error instanceof Error) return res.status(500).json({ message: error.message });

    res.status(500).json({ message: 'Something went wrong!' });
  }
}

export async function deleteTask(req: Request, res: Response): Promise<void | Response> {
  try {
    const taskId = req.params.taskId;

    if (!taskId) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const taskExists = await TaskModel.taskExists(taskId);

    if (!taskExists) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const taskDeleted = await TaskModel.deleteTask(taskId);

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
