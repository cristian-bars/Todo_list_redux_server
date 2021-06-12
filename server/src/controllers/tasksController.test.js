const {
  getAll,
  addTask,
  delTask,
  doneTask
} = require('./tasksController')();
const Task = require('../models/taskModel');

jest.mock('../models/taskModel');

describe('getAll', () => {
  test('shoud get all tasks', async () => {
    // arrange
    const res = {
      json: jest.fn()
    };
    Task.find.mockResolvedValueOnce([{ task: 'Good task' }]);

    // act
    await getAll(null, res);

    // assert
    expect(res.json).toHaveBeenCalledWith([{ task: 'Good task' }]);
  });
});

describe('addTask', () => {
  class MockTask {
    constructor(task) {
      this.task = task;
    }

    // eslint-disable-next-line class-methods-use-this
    save() {}
  }

  test('should call json', async () => {
    // arrange
    const req = {
      body: null
    };
    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    const newTask = new MockTask('task');

    Task.mockReturnValueOnce(newTask);

    // act
    await addTask(req, res);
    // assert
    expect(res.json).toHaveBeenCalledWith({ task: 'task' });
  });

  test('should call send', async () => {
    // arrange
    const req = {
      body: null
    };
    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    Task.mockReturnValueOnce({
      save: jest.fn().mockRejectedValueOnce('error')
    });

    // act
    await addTask(req, res);
    // assert
    expect(res.send).toHaveBeenCalledWith('error');
  });
});
describe('delTask', () => {
  test('should call json', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        taskId: null
      }
    };

    await delTask(req, res);

    expect(res.json).toHaveBeenCalled();
  });
  test('should call status with 204', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        taskId: null
      }
    };

    await delTask(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });
  test('should fail and call res.send with error', async () => {
    const req = {
      params: {
        taskId: null
      }
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };
    Task.findByIdAndDelete.mockRejectedValueOnce('error');

    await delTask(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('When invoked a doneTask', () => {
  test('Should call a func json with', async () => {
    const req = {
      params: { tasks: 2 },
      body: { task: 'Cristian' }
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn()
    };
    Task.findByIdAndUpdate.mockResolvedValueOnce('Testing');
    await doneTask(req, res);
    expect(res.json).toHaveBeenCalledWith('Testing');
  });

  test('Should call a func send with error', async () => {
    const req = {
      params: { todoId: 5 },
      body: { task: 'peppacoe' }
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn()
    };
    Task.findByIdAndUpdate.mockRejectedValueOnce('PACO');
    await doneTask(req, res);
    expect(res.send).toHaveBeenCalledWith('PACO');
  });
});
