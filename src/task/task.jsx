/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-autofocus */
import { useState, useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { useTimer } from '../Timer/useTimer';
import './task.css';

function Task({ time, changeTodo, sec, min, todo, index, id, completed, oncurrentTimer }) {
  const [state, setState] = useState({
    value: '',
    date: time,
    checked: false,
  });
  const keyRef = useRef(false);
  const timerMimutesId = useRef(null);
  const inputRef = useRef(null);
  const [timer, onTimer] = useTimer(min, sec, id);

  const onEditTodo = (e) => {
    const { value, checked } = state;
    if (inputRef.current.checked) {
      onTimer.lock();
    } else {
      onTimer.unLock();
    }
    const v = e.target.value.trim();
    switch (e.type) {
      case 'keyup':
        if (e.key === 'Escape') {
          setState((prev) => ({ ...prev, value: '' }));
        }
        if (e.key === 'Enter' && v !== '') {
          changeTodo(value, {
            id,
            index,
            value: v,
            completed: false,
            edit: true,
            time: state.time,
          });
          setState((prev) => ({ ...prev, value: '' }));
        }
        break;
      case 'change':
        setState((prev) => {
          return {
            ...prev,
            checked: !prev.checked,
          };
        });
        setState((prev) => {
          return {
            ...prev,
            value: prev.value === 'completed' ? '' : 'completed',
          };
        });
        changeTodo('', {
          id,
          index,
          value: todo,
          completed: !checked,
          edit: false,
          time: state.time,
        });
        break;
      case 'click':
        changeTodo('', {
          index,
          remove: true,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    timerMimutesId.current = setInterval(() => {
      setState((prev) => ({ ...prev, date: time }));
    }, 60000);
    return () => {
      clearInterval(timerMimutesId.current);
      keyRef.current = !keyRef.current;
    };
  }, []);

  useEffect(
    () => () => {
      if (!keyRef.current) {
        oncurrentTimer(id, timer.minutes, timer.seconds);
      }
    },
    [timer]
  );

  return (
    <li className={completed ? 'completed' : state.value}>
      <div className="view">
        <input
          ref={inputRef}
          className="toggle"
          type="checkbox"
          checked={completed ? true : state.checked}
          onChange={(e) => onEditTodo(e)}
        />
        <label htmlFor="domId">
          <span className="title">{todo}</span>
          <span className="description">
            <button onClick={onTimer} type="button" className={!timer.key ? 'icon icon-play' : 'icon icon-pause'}>
              {' '}
            </button>
            {timer.minutes > 9 ? timer.minutes : `0${timer.minutes}`}:
            {timer.seconds > 9 ? timer.seconds : `0${timer.seconds}`}
          </span>

          <span className="created">{formatDistanceToNow(state.date)}</span>
        </label>
        <button
          aria-label="Mute volume"
          type="button"
          onClick={() => setState((prev) => ({ ...prev, value: 'editing' }))}
          className="icon icon-edit"
        />

        <button aria-label="Mute volume" type="button" onClick={(e) => onEditTodo(e)} className="icon icon-destroy" />
      </div>

      {state.value === 'editing' ? (
        <input autoFocus type="text" onKeyUp={(e) => onEditTodo(e)} className="edit" defaultValue={todo} />
      ) : null}
    </li>
  );
}

Task.defaultProps = {
  changeTodo: Function.prototype,
  oncurrentTimer: Function.prototype,
  todo: '',
  index: 0,
  id: '',
  completed: false,
  time: new Date(),
  sec: 0,
  min: 0,
};
Task.propTypes = {
  changeTodo: PropTypes.func,
  oncurrentTimer: PropTypes.func,
  todo: PropTypes.node,
  infex: PropTypes.number,
  id: PropTypes.string,
  completed: PropTypes.bool,
  time: PropTypes.instanceOf(Date),
  sec: PropTypes.number || PropTypes.undefined,
  min: PropTypes.number || PropTypes.undefined,
};

export { Task };
