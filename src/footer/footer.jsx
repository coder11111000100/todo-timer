import React from 'react';
import './footer.css';
import PropTypes from 'prop-types';

import { TaskFilter } from '../task-filter/taskFilter';

function Footer({ onFilterTodos, count, clear }) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter onFilterTodos={onFilterTodos} />
      <button
        type="button"
        aria-label="Mute volume1"
        onClick={() => clear()}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  onFilterTodos: Function.prototype,
  count: 0,
  clear: Function.prototype,
};

Footer.propTypes = {
  count: PropTypes.node,
  onFilterTodos: PropTypes.func,
  clear: PropTypes.func,
};

export { Footer };
