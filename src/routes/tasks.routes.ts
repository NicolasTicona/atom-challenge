/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
export const router = express.Router();

router.get('/', (req: Request, res: Response) => {});

router.post('/', (req: Request, res: Response) => {});

router.put('/:taskId', (req: Request, res: Response) => {});

router.delete('/:taskId', (req: Request, res: Response) => {});
