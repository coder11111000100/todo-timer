/* eslint-disable react/no-array-index-key */

import PropTypes from 'prop-types';
import React from 'react';
import './taskFilter.css';

class TaskFilter extends React.Component {
  constructor(props) {
    super(props);
    this.onFilterTodos = props.onFilterTodos;
    this.state = { value: null };
  }

  onSelected = (e) => {
    this.setState({ value: e.target.dataset.foo });
    this.onFilterTodos(e.target.value);
  };

  render() {
    const buttons = ['All', 'Active', 'Completed'];
    const { value } = this.state;
    return (
      <ul className="filters">
        {buttons.map((el, i) => {
          return (
            <li key={i}>
              <button
                type="button"
                aria-label="Mute volume2"
                data-foo={i}
                value={el}
                onClick={this.onSelected}
                className={(value === i.toString() && 'selected').toString()}
              >
                {el}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

TaskFilter.defaultProps = { onFilterTodos: Function.prototype };
TaskFilter.propTypes = {
  onFilterTodos: PropTypes.func,
};

export { TaskFilter };
