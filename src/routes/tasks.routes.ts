import express from 'express';
import { TasksController } from '../controllers/tasks.controller';
import { TaskModel, TASK_COLLECTION_REF } from '../models/task.model';
export const router = express.Router();

const taskController = new TasksController(new TaskModel(TASK_COLLECTION_REF));

router.get('/', taskController.getTasks);

router.post('/', taskController.createTask);

router.put('/:taskId', taskController.updateTask);

router.delete('/:taskId', taskController.deleteTask);
