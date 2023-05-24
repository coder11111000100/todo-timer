/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import './newTaskForm.css';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      minutes: '',
      seconds: '',
    };
  }

  onLabelChange = (evt) => {
    const { target } = evt;
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  render() {
    const { description, minutes, seconds } = this.state;
    const { changeTodo } = this.props;
    return (
      <form
        className="new-todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          changeTodo(description.trim(), { minutes, seconds });
          this.setState({ description: '', minutes: '', seconds: '' });
        }}
      >
        <button type="submit" aria-label="submission" />
        <input
          className="new-todo"
          type="text"
          name="description"
          onChange={this.onLabelChange}
          minLength={1}
          maxLength={20}
          placeholder="What needs to be done?"
          value={description}
          required
        />
        <input
          className="new-todo-form__timer"
          type="text"
          name="minutes"
          onChange={this.onLabelChange}
          pattern="[0-9]*"
          placeholder="Min"
          value={minutes}
        />
        <input
          className="new-todo-form__timer"
          type="text"
          name="seconds"
          onChange={this.onLabelChange}
          pattern="[0-6]{1}[0-9]*"
          placeholder="Sec"
          value={seconds}
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
