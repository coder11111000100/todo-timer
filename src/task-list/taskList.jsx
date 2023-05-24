import PropTypes from 'prop-types';
import React from 'react';
import { Task } from '../task/task';
import './taskList.css';

function TaskList({ store: todos, changeTodo, useKey, oncurrentTimer }) {
  const elemToCreate = (id, func, todo, i, completed, time, minutes, sec) => {
    return (
      <Task
        key={id}
        changeTodo={func}
        todo={todo}
        index={i}
        id={id}
        completed={completed}
        time={time}
        minutes={minutes}
        sec={sec}
        oncurrentTimer={oncurrentTimer}
      />
    );
  };

  return (
    <ul className="todo-list">
      {todos.length === 0
        ? null
        : todos.map((item, i) => {
            if (useKey === 'All') {
              return elemToCreate(
                item.id,
                changeTodo,
                item.value,
                i,
                item.completed,
                item.time,
                item.minutes,
                item.sec
              );
            }
            if (useKey === 'Active') {
              if (!item.completed)
                return elemToCreate(
                  item.id,
                  changeTodo,
                  item.value,
                  i,
                  item.completed,
                  item.time,
                  item.minutes,
                  item.sec
                );
            }
            if (useKey === 'Completed') {
              if (item.completed)
                return elemToCreate(
                  item.id,
                  changeTodo,
                  item.value,
                  i,
                  item.completed,
                  item.time,
                  item.minutes,
                  item.sec
                );
            }
            return null;
          })}
    </ul>
  );
}

TaskList.defaultProps = {
  store: [],
  changeTodo: Function.prototype,
  oncurrentTimer: Function.prototype,
  useKey: '',
  sec: undefined,
  minutes: undefined,
};

TaskList.propTypes = {
  store: PropTypes.array,
  changeTodo: PropTypes.func,
  oncurrentTimer: PropTypes.func,
  useKey: PropTypes.string,
  sec: PropTypes.number || PropTypes.undefined,
  minutes: PropTypes.number || PropTypes.undefined,
};

export { TaskList };
