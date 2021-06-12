import tasksReducer from './tasksReducer';

const taskList = [{
  _id: 1,
  task: 'Title',
  completed: false
},
{
  _id: 2,
  task: 'Title 2',
  completed: true
}];

const loadAction = {
  type: 'LOAD_TASKS',
  tasks: taskList[0]
};

const deleteAction = {
  type: 'DELETE_TASK',
  taskId: { _id: 1 }
};

const addAction = {
  type: 'ADD_TASK',
  task: { ...taskList[1] }
};

const updateAction = {
  type: 'DONE_TASK',
  task: { ...taskList[0], task: true }
};

describe('Given a taskReducer', () => {
  describe('and invoked with a LOAD_TASK action', () => {
    test('should return an updated selectedTask', () => {
      const result = tasksReducer(null, loadAction);
      expect(result).toEqual(taskList[0]);
    });
  });
});

describe('and invoked with a ADD_TASK action and a task', () => {
  test('should return an updated task list including the given task', () => {
    const result = tasksReducer([{ ...taskList[0] }], addAction);
    expect(result).toEqual(taskList);
  });
});

describe('and invoked with a DELETE_TASK action and an id', () => {
  test('should return an updated task list withoud the corresponding id task', () => {
    const result = tasksReducer([...taskList], deleteAction);
    expect(result).toEqual([
      {
        _id: 2,
        task: 'Title 2',
        completed: true
      }]);
  });
});

describe('and invoked with a DONE_TASK action and an id', () => {
  test('should return an updated task list withoud the corresponding id task', () => {
    const result = tasksReducer([{ ...taskList[0] }], updateAction);
    expect(result).toEqual([
      {
        _id: 1,
        task: 'Title',
        completed: false
      }]);
  });
});
