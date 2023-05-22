import React from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { NewTaskForm } from '../new-task-form/newTaskForm';

import { TaskList } from '../task-list/taskList';

import { Footer } from '../footer/footer';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { store: [], key: 'All' };
  }

  onsetTodo = (todo = '', props = {}) => {
    if (props.remove) {
      this.setState((prev) => {
        const filterStore = prev.store.filter((_, i) => i !== props.index);
        return {
          store: filterStore,
        };
      });
    }
    if (props.edit || typeof props.completed === 'boolean') {
      this.setState((prev) => {
        const { index, ...itemProps } = props;
        const newState = prev.store.slice();
        newState[index] = itemProps;
        return {
          store: [...newState],
        };
      });
    } else if (todo !== '') {
      this.setState((prev) => {
        const { store } = prev;
        let hasValue = false;
        if (store.length) {
          hasValue = store.some((item) => item.value === todo);
        }
        if (!hasValue) {
          return {
            store: [
              {
                id: nanoid(3),
                value: todo,
                completed: false,
                edit: false,
                time: new Date(),
              },
              ...store,
            ],
          };
        }
        return prev;
      });
    }
  };

  onClearTodos = () => {
    this.setState((prev) => {
      const { store } = prev;
      const compl = store.filter((item) => !item.completed);
      return {
        store: compl,
      };
    });
  };

  onFilterTodos = (select) => {
    this.setState({ key: select });
  };

  onCountNotCompleted = () => {
    const { store } = this.state;
    return store.filter((item) => !item.completed);
  };

  render() {
    const { store, key } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm changeTodo={this.onsetTodo} />
        </header>
        <section className="main">
          <TaskList state={store} changeTodo={this.onsetTodo} useKey={key} />
          <Footer
            clear={this.onClearTodos}
            onFilterTodos={this.onFilterTodos}
            count={this.onCountNotCompleted().length}
          />
        </section>
      </section>
    );
  }
}
