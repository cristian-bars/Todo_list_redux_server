import actionTypes from '../actions/actionTypes';

function taskReducer(task = {}, action) {
  switch (action.type) {
    case actionTypes.LOAD_TASKS:
      return action.type;
    default:
      return task;
  }
}

export default taskReducer;
