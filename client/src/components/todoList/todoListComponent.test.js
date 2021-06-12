/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import TodoListComponent from './TodoListComponent';
import { loadTasks } from '../../redux/actions/actionCreator';
import actionTypes from '../../redux/actions/actionTypes';

jest.mock('../../redux/actions/actionCreator');

describe('Given a TodoListComponent component', () => {
  describe('When is redered with empty initial state', () => {
    test('Then \'No Tasks\' should be in the document', () => {
      const initialState = { tasks: [] };
      loadTasks.mockReturnValueOnce({ type: actionTypes.LOAD_TASKS, tasks: [] });

      render(<TodoListComponent />, { initialState });

      expect(screen.getByText(/No Tasks/i)).toBeInTheDocument();
    });
  });
});
