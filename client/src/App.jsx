import React from 'react';
import { Provider } from 'react-redux';
import './styles/styles.css';
import TodoListComponent from './components/todoList/TodoListComponent';
import store from './redux/store/index';

function App() {
  return (
    <Provider store={store()}>
      <h1 className="header__title">TO DO LIST</h1>
      <TodoListComponent />
    </Provider>
  );
}

export default App;
