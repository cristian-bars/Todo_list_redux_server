/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  addTask, deleteTask, loadTasks, doneTask
} from '../../redux/actions/actionCreator';

function TodoListComponent({ tasks, dispatch }) {
  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  function clearTask(task) {
    dispatch(deleteTask(task));
  }

  function markTask(task) {
    // eslint-disable-next-line no-underscore-dangle
    const markDone = document.getElementById(task._id);
    markDone.classList = 'container__item container__item-done';
    dispatch(doneTask(task));
  }

  function newTask() {
    const value = document.getElementById('newTask');
    const task = { task: value.value, completed: false };
    value.value = '';
    dispatch(addTask(task));
  }
  return (
    <div>
      <div>
        <inputlabel className="container__item">Add task</inputlabel>
        <input type="text" placeholder="Task description" id="newTask" className="container__addInput" />
        <button type="button" onClick={() => newTask()} className="container__addButton">Add task</button>
      </div>
      {tasks.length
        ? (
          <ul className="container__list">
            {
          tasks?.length && (
            tasks.map((element) => (
              <>
                <li className={`container__item ${element.completed === true && 'container__item-done'}`} key={element.id} id={element._id}>
                  {element.task}
                  <button type="button" className="container__delTaskButton" onClick={() => clearTask(element)}>Delete</button>
                  <button type="button" className="container__doneTaskButton" onClick={() => markTask(element)}>Done</button>

                </li>
              </>
            ))
          )
        }
          </ul>
        )
        : <div className="container__item">No Tasks</div>}

    </div>
  );
}

TodoListComponent.propTypes = {
  tasks: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    tasks: store.tasks
  };
}

export default connect(mapStateToProps)(TodoListComponent);
