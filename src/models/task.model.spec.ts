/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Task, TaskStatus, TaskTemplate } from './task.interface';
import { TaskModel } from './task.model';

describe('Task Model', () => {
  const mockTask: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: TaskStatus.Completed,
    },
  ];

  test('should get list of tasks', async () => {
    const mockCollectionRef = jest.fn().mockImplementation(() => {
      return {
        get: () => {
          return {
            docs: [
              {
                id: '1',
                data: () => {
                  return {
                    title: 'Task 1',
                    description: 'Description 1',
                    status: 'completed',
                  };
                },
              },
            ],
          };
        },
      };
    });

    const mockInstanceCollectionRef = new mockCollectionRef();
    const taskModel = new TaskModel(mockInstanceCollectionRef);

    const tasks = await taskModel.getTasks();

    expect(tasks).toEqual(mockTask);
  });

  test('should create a task', async () => {
    const newTask: TaskTemplate = {
      title: 'new',
      description: 'description',
      status: TaskStatus.Completed,
    };

    const mockCollectionRef = jest.fn().mockImplementation(() => {
      return {
        add: () =>
          Promise.resolve({
            get: () =>
              Promise.resolve({
                id: '1',
                data: () => newTask,
              }),
          }),
      };
    });

    const mockInstanceCollectionRef = new mockCollectionRef();
    const taskModel = new TaskModel(mockInstanceCollectionRef);

    const task = await taskModel.createTask(newTask);

    expect(task).toEqual({ id: '1', ...newTask });
  });

  test('should update a task', async () => {
    const updateTask: TaskTemplate = {
      title: 'update',
      description: 'description',
      status: TaskStatus.Completed,
    };

    const taskId = '10';

    const mockCollectionRef = jest.fn().mockImplementation(() => {
      return {
        doc: () => {
          return {
            set: () => Promise.resolve(),
            get: () =>
              Promise.resolve({
                id: taskId,
                data: () => updateTask,
              }),
          };
        },
      };
    });

    const mockInstanceCollectionRef = new mockCollectionRef();
    const taskModel = new TaskModel(mockInstanceCollectionRef);

    const task = await taskModel.updateTask(taskId, updateTask);

    expect(task).toEqual({ id: taskId, ...updateTask });
  });

  test('should delete a task', async () => {
    const taskId = '10';

    const mockCollectionRef = jest.fn().mockImplementation(() => {
      return {
        doc: () => {
          return {
            delete: () => Promise.resolve(true),
          };
        },
      };
    });

    const mockInstanceCollectionRef = new mockCollectionRef();
    const taskModel = new TaskModel(mockInstanceCollectionRef);

    const response = await taskModel.deleteTask(taskId);

    expect(response).toBeTruthy();
  });

  test('should validate task exists', async () => {
    const mockCollectionRef = jest.fn().mockImplementation(() => {
      return {
        doc: () => {
          return {
            get: () =>
              Promise.resolve({
                exists: true,
              }),
          };
        },
      };
    });

    const mockInstanceCollectionRef = new mockCollectionRef();
    const taskModel = new TaskModel(mockInstanceCollectionRef);
    const taskExists = await taskModel.taskExists('10');

    expect(taskExists).toBeTruthy();
  });

  test('should validate task not exists ', async () => {
    const mockCollectionRef = jest.fn().mockImplementation(() => {
      return {
        doc: () => {
          return {
            get: () =>
              Promise.resolve({
                exists: false,
              }),
          };
        },
      };
    });

    const mockInstanceCollectionRef = new mockCollectionRef();
    const taskModel = new TaskModel(mockInstanceCollectionRef);
    const taskExists = await taskModel.taskExists('10');

    expect(taskExists).toBeFalsy();
  });
});
