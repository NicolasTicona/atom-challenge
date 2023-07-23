import express, { Request, Response } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasks.controller';
import { validateStatus } from '../utils/validate-task-status.util';
export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err?.message });
    }
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status)
      return res.status(400).json({ message: 'Missing fields' });

    if (!validateStatus(status)) return res.status(400).json({ message: 'Invalid status' });

    const task = await createTask({ title, description, status });

    res.json({
      message: 'Task created',
      task,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err?.message });
    }
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.put('/:taskId', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, status } = req.body;

    if (!taskId || !title || !description || !status)
      return res.status(400).json({ message: 'Missing fields' });

    if (!validateStatus(status)) return res.status(400).json({ message: 'Invalid status' });

    const task = await updateTask(taskId, { title, description, status });

    res.json({
      message: 'Task updated',
      task,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err?.message });
    }
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.delete('/:taskId', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;

    if (!taskId) return res.status(400).json({ message: 'Invalid task id' });

    const taskDeleted = await deleteTask(taskId);

    if (!taskDeleted) {
      return res.status(400).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task deleted',
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err?.message });
    }
    res.status(500).json({ message: 'Something went wrong!' });
  }
});
