/* eslint-disable react/no-array-index-key */

import PropTypes from 'prop-types';
import { useState } from 'react';
import './taskFilter.css';

function TaskFilter({ onFilterTodos }) {
  const [state, setState] = useState({ value: null });
  const buttons = ['All', 'Active', 'Completed'];

  const onSelected = (e) => {
    setState({ value: e.target.dataset.foo });
    onFilterTodos(e.target.value);
  };

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
              onClick={onSelected}
              className={(state.value === i.toString() && 'selected').toString()}
            >
              {el}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

TaskFilter.defaultProps = { onFilterTodos: Function.prototype };
TaskFilter.propTypes = {
  onFilterTodos: PropTypes.func,
};

export { TaskFilter };
