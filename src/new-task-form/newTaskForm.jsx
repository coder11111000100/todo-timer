/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import './newTaskForm.css';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    const { value } = this.state;
    const { changeTodo } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changeTodo(value.trim());
          this.setState({ value: '' });
        }}
      >
        <input
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={value}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  changeTodo: Function.prototype,
};

NewTaskForm.propTypes = {
  changeTodo: PropTypes.func,
};

export { NewTaskForm };
