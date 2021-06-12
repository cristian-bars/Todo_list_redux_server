/* eslint-disable no-underscore-dangle */
import actionTypes from '../actions/actionTypes';

function tasksReducer(tasks = [], action) {
  switch (action.type) {
    case actionTypes.LOAD_TASKS:
      return action.tasks;

    case actionTypes.ADD_TASK:
      return [...tasks, action.task];

    case actionTypes.DELETE_TASK:
      return tasks.filter((task) => task._id !== action.taskId._id);

    case actionTypes.DONE_TASK:
      return tasks.map(
        (task) => (task._id === action.task.id
          ? { ...task, ...action.task.task }
          : task)
      );

    default:
      return tasks;
  }
}

export default tasksReducer;
