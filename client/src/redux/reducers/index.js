import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import selectedTaskReducer from './selectedTaskReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  selectedTask: selectedTaskReducer
});

export default rootReducer;
