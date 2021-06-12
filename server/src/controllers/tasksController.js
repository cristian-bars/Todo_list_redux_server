/* eslint-disable no-underscore-dangle */
const debug = require('debug')('app:tasksController');
const Task = require('../models/taskModel');

function tasksController() {
  async function getAll(req, res) {
    const tasks = await Task.find();
    res.json(tasks);
  }

  async function addTask(req, res) {
    const newTask = new Task(req.body);
    debug(newTask);
    try {
      await newTask.save();
      res.json(newTask);
    } catch (error) {
      debug(error);
      res.send(error);
    }
  }

  async function delTask(req, res) {
    try {
      await Task.findByIdAndDelete(req.params.tasks);
      res.status(204);
      res.json();
    } catch (error) {
      res.status(404);
      debug(error);
      res.send(error);
    }
  }

  async function doneTask(req, res) {
    const id = { id: req.params.tasks };
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id.id,
        { completed: true }
      );
      res.status(204);
      res.json(updatedTask);
    } catch (error) {
      res.status(404);
      debug(error);
      res.send(error);
    }
  }
  return {
    getAll,
    addTask,
    delTask,
    doneTask
  };
}

module.exports = tasksController;
