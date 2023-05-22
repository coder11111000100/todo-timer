import PropTypes from 'prop-types';
import React from 'react';
import { Task } from '../task/task';
import './taskList.css';

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  // eslint-disable-next-line class-methods-use-this
  onDefaultState = (initialTime) => {
    const { ...arg } = initialTime;
    this.setState({ ...arg });
  };

  render() {
    const { state: todos, changeTodo, useKey } = this.props;
    const elemToCreate = (id, func, todo, i, completed, time) => {
      return (
        <Task
          key={id}
          changeTodo={func}
          todo={todo}
          index={i}
          id={id}
          completed={completed}
          time={time}
          onDefaultState={this.onDefaultState}
          intial={this.state}
        />
      );
    };

    return (
      <ul className="todo-list">
        {todos.length === 0
          ? null
          : todos.map((item, i) => {
              if (useKey === 'All') {
                return elemToCreate(item.id, changeTodo, item.value, i, item.completed, item.time);
              }
              if (useKey === 'Active') {
                if (!item.completed) return elemToCreate(item.id, changeTodo, item.value, i, item.completed, item.time);
              }
              if (useKey === 'Completed') {
                if (item.completed) return elemToCreate(item.id, changeTodo, item.value, i, item.completed, item.time);
              }
              return null;
            })}
      </ul>
    );
  }
}

TaskList.defaultProps = {
  state: [],
  changeTodo: Function.prototype,
  useKey: '',
};

TaskList.propTypes = {
  state: PropTypes.array,
  changeTodo: PropTypes.func,
  useKey: PropTypes.string,
};

export { TaskList };
