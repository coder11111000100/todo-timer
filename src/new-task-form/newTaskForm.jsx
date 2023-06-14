/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';
import PropTypes from 'prop-types';
import './newTaskForm.css';

function NewTaskForm({ changeTodo }) {
  const [state, setState] = useState({
    description: '',
    minutes: '',
    seconds: '',
  });

  const onLabelChange = (evt) => {
    const { target } = evt;
    const { name } = target;
    setState((pre) => ({
      ...pre,
      [name]: target.value,
    }));
  };

  return (
    <form
      className="new-todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        changeTodo(state.description.trim(), { minutes: state.minutes, seconds: state.seconds });
        setState({ description: '', minutes: '', seconds: '' });
      }}
    >
      <button type="submit" aria-label="submission" />
      <input
        className="new-todo"
        type="text"
        name="description"
        onChange={onLabelChange}
        minLength={1}
        maxLength={20}
        placeholder="What needs to be done?"
        value={state.description}
        required
      />
      <input
        className="new-todo-form__timer"
        type="text"
        name="minutes"
        onChange={onLabelChange}
        pattern="[0-9]*"
        placeholder="Min"
        value={state.minutes}
      />
      <input
        className="new-todo-form__timer"
        type="text"
        name="seconds"
        onChange={onLabelChange}
        pattern="[0-6]{1}[0-9]*"
        placeholder="Sec"
        value={state.seconds}
      />
    </form>
  );
}

NewTaskForm.defaultProps = {
  changeTodo: Function.prototype,
};

NewTaskForm.propTypes = {
  changeTodo: PropTypes.func,
};

export { NewTaskForm };
