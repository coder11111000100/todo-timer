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
    if (props?.remove) {
      // удаление таски
      this.setState((prev) => {
        const filterStore = prev.store.filter((_, i) => i !== props.index);
        return {
          store: filterStore,
        };
      });
    }
    if (props?.edit || typeof props.completed === 'boolean') {
      // редактирование таски
      this.setState((prev) => {
        const { index, ...itemProps } = props;
        const newState = prev.store.slice();
        newState[index] = itemProps;
        return {
          store: [...newState],
        };
      });
    } else if (todo !== '') {
      // создание таски и проверки на одинаковый name и '' таски
      this.setState((prev) => {
        let { minutes, seconds: sec } = props;
        minutes = +minutes;
        sec = +sec;
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
                sec,
                minutes,
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
      // в stаte закидываются только завершенные таски
      const { store } = prev;
      const compl = store.filter((item) => !item.completed);
      return {
        store: compl,
      };
    });
  };

  onFilterTodos = (select) => {
    // фильтер в футоре all, completed, active
    this.setState({ key: select });
  };

  onCountNotCompleted = () => {
    // для отображение активных тасок
    const { store } = this.state;
    return store.filter((item) => !item.completed);
  };

  oncurrentTimer = (id, minutes, sec) => {
    // текущее время таски
    this.setState((prev) => {
      const newState = prev.store.slice();
      const index = prev.store.findIndex((item) => item.id === id);
      newState[index] = { ...newState[index], sec, minutes };
      return {
        store: [...newState],
      };
    });
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
          <TaskList store={store} changeTodo={this.onsetTodo} useKey={key} oncurrentTimer={this.oncurrentTimer} />
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
