import { Request, Response } from 'express';
import { TasksController } from './tasks.controller';

describe('Task Controller', () => {
  const mockTask = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
    },
  ];

  describe('getTasks', () => {
    test('should get tasks created succesfully', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          getTasks: jest.fn().mockResolvedValue(Promise.resolve(mockTask)),
        };
      });

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);
      await taskController.getTasks(req, res);
      expect(res.json).toHaveBeenCalledWith(mockTask);
    });

    test('should get error 500', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          getTasks: jest.fn().mockRejectedValue(new Error()),
        };
      });

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);
      await taskController.getTasks(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('createTask', () => {
    test('should create task succesfully', async () => {
      const req = {
        body: {
          title: 'Task 1',
          description: 'Description 1',
          status: 'pending',
        },
      } as Request;
      const res = {
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          createTask: jest.fn().mockResolvedValue(Promise.resolve(mockTask[0])),
        };
      });

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.createTask(req, res);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Task created',
        task: mockTask[0],
      });
    });

    test('should validate missing fields', async () => {
      const req = {
        body: {
          title: 'Task 1',
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn();

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.createTask(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing fields' });
    });

    test('should validate invalid status', async () => {
      const req = {
        body: {
          title: 'Task 1',
          description: 'Description 1',
          status: 'invalid',
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn();

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.createTask(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid status' });
    });

    test('should get error 500', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          createTask: jest.fn().mockRejectedValue(new Error()),
        };
      });

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);
      await taskController.getTasks(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    test('should update task succesfully', async () => {
      const req = {
        params: {
          taskId: '1',
        },
        body: {
          title: 'Task 1',
          description: 'Description 1',
          status: 'pending',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          updateTask: jest.fn().mockResolvedValue(Promise.resolve(mockTask[0])),
          taskExists: jest.fn().mockResolvedValue(Promise.resolve(true)),
        };
      });
      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.updateTask(req, res);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Task updated',
        task: mockTask[0],
      });
    });

    test('should validate task exists before updating', async () => {
      const req = {
        params: {
          taskId: '1',
        },
        body: {
          title: 'Task 1',
          description: 'Description 1',
          status: 'pending',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          updateTask: jest.fn(),
          taskExists: jest.fn().mockResolvedValue(Promise.resolve(false)),
        };
      });
      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.updateTask(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Task not found',
      });
    });

    test('should validate missing fields', async () => {
      const req = {
        params: {},
        body: {
          title: 'Task 1',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn();

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.updateTask(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing fields' });
    });

    test('should validate invalid status', async () => {
      const req = {
        params: {
          taskId: '1',
        },
        body: {
          title: 'Task 1',
          description: 'Description 1',
          status: 'invalid',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn();

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.updateTask(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid status' });
    });

    test('should get error 500', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          updateTask: jest.fn().mockRejectedValue(new Error()),
        };
      });

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);
      await taskController.updateTask(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    test('should delete task succesfully', async () => {
      const req = {
        params: {
          taskId: '1',
        },
      } as unknown as Request;
      const res = {
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          deleteTask: jest.fn().mockResolvedValue(Promise.resolve(true)),
          taskExists: jest.fn().mockResolvedValue(Promise.resolve(true)),
        };
      });
      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.deleteTask(req, res);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Task deleted',
      });
    });

    test('should validate id in params', async () => {
      const req = {
        params: {
          taskId: '',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn();

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.deleteTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid task id',
      });
    });

    test('should validate task exists', async () => {
      const req = {
        params: {
          taskId: '32',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          taskExists: jest.fn().mockResolvedValue(Promise.resolve(false)),
        };
      });

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);

      await taskController.deleteTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Task not found',
      });
    });

    test('should get error 500', async () => {
      const req = {
        params: {
          taskId: '1',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockTaskModel = jest.fn().mockImplementation(() => {
        return {
          deleteTask: jest.fn().mockRejectedValue(new Error()),
          taskExist: jest.fn().mockResolvedValue(Promise.resolve(true)),
        };
      });

      const mockInstanceTaskModel = new mockTaskModel();
      const taskController = new TasksController(mockInstanceTaskModel);
      await taskController.updateTask(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
