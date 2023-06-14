import { useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { NewTaskForm } from '../new-task-form/newTaskForm';

import { TaskList } from '../task-list/taskList';

import { Footer } from '../footer/footer';

function App() {
  const [states, setStates] = useState({ store: [], key: 'All' });

  const onsetTodo = (todo = '', props = {}) => {
    if (props?.remove) {
      // удаление таски
      setStates((prev) => {
        const filterStore = prev.store.filter((_, i) => i !== props.index);
        return {
          ...prev,
          store: filterStore,
        };
      });
    }
    if (props?.edit || typeof props.completed === 'boolean') {
      // редактирование таски
      setStates((prev) => {
        const { index, ...itemProps } = props;
        const newState = prev.store.slice();
        newState[index] = itemProps;
        return {
          ...prev,
          store: [...newState],
        };
      });
    } else if (todo !== '') {
      // создание таски и проверки на одинаковый name и '' таски
      setStates((prev) => {
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
            ...prev,
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

  const onClearTodos = () => {
    setStates((prev) => {
      // в stаte закидываются только завершенные таски
      const { store } = prev;
      const compl = store.filter((item) => !item.completed);
      return {
        ...prev,
        store: compl,
      };
    });
  };

  const onFilterTodos = (select) => {
    // фильтер в футоре all, completed, active
    setStates((prev) => ({ ...prev, key: select }));
  };

  const onCountNotCompleted = () => {
    // для отображение активных тасок
    const { store } = states;
    return store.filter((item) => !item.completed);
  };

  const oncurrentTimer = (id, minutes, sec) => {
    // текущее время таски
    setStates((prev) => {
      const newState = prev.store.slice();
      const index = prev.store.findIndex((item) => item.id === id);
      newState[index] = {
        ...newState[index],
        sec,
        minutes,
      };
      return {
        ...prev,
        store: newState,
      };
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm changeTodo={onsetTodo} />
      </header>
      <section className="main">
        <TaskList store={states.store} changeTodo={onsetTodo} useKey={states.key} oncurrentTimer={oncurrentTimer} />
        <Footer clear={onClearTodos} onFilterTodos={onFilterTodos} count={onCountNotCompleted().length} />
      </section>
    </section>
  );
}

export { App };
