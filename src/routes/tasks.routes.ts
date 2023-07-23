import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasks.controller';
export const router = express.Router();

router.get('/', getTasks);

router.post('/', createTask);

router.put('/:taskId', updateTask);

router.delete('/:taskId', deleteTask);
