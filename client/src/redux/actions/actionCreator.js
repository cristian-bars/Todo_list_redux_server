/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import actionTypes from './actionTypes';

const url = 'http://localhost:2022/tasks';
// const url = process.env.REACT_APP_URL;

export function loadTasks() {
  return async (dispatch) => {
    try {
      const { data } = await axios(url);
      dispatch({
        type: actionTypes.LOAD_TASKS,
        tasks: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_TASKS_ERROR
      });
    }
  };
}

export function addTask(newTask) {
  return async (dispatch) => {
    const { data } = await axios.post(url, newTask);
    dispatch({
      type: actionTypes.ADD_TASK,
      task: data
    });
  };
}

export function deleteTask(taskId) {
  return async (dispatch) => {
    await axios.delete(`${url}/${taskId._id}`);
    dispatch({
      type: actionTypes.DELETE_TASK,
      taskId
    });
  };
}

export function doneTask(taskId) {
  return async (dispatch) => {
    const { data } = await axios.post(`${url}/${taskId._id}`, taskId);
    dispatch({
      type: actionTypes.DONE_TASK,
      task: data
    });
  };
}
