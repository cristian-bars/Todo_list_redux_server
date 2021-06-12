import axios from 'axios';
import {
  loadTasks, addTask, deleteTask, doneTask
} from './actionCreator';

jest.mock('axios');
jest.mock('./actionTypes');

describe('When invoked a loadTasks func', () => {
  test('should return and async function', async () => {
    axios.mockResolvedValueOnce({ task: 'Cristian' });
    const dispatch = jest.fn();
    await loadTasks()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
  test('should dispatch LOAD_TASKS_ERROR', async () => {
    const loadTasksResponse = loadTasks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue()
    });
    const dispatch = jest.fn();
    await loadTasksResponse(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOAD_TASKS_ERROR'
    });
  });
});

describe('When invoked a addTask func', () => {
  test('should call a async func', async () => {
    axios.post.mockResolvedValueOnce({ data: 'Pepe' });
    const dispatch = jest.fn();
    await addTask()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('When invoked a deleteTask', () => {
  test('should call a asunc func', async () => {
    const task = {
      task: 'Anna',
      completed: false
    };
    axios.delete.mockResolvedValueOnce({ data: 'Cristian' });
    const dispatch = jest.fn();
    await deleteTask(task)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('When invoked a modifyTask', () => {
  test('should call a async func', async () => {
    const task = {
      task: 'Anna',
      completed: false
    };
    axios.post.mockResolvedValueOnce({ data: 'Irene' });
    const dispatch = jest.fn();
    await doneTask(task)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});
