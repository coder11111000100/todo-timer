/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.timerId = React.createRef(null);
    this.state = {
      value: '',
      checked: false,
      date: props.time,
      key: true,
      sec: 0,
      minutes: 0,
      hour: 0,
      deys: 0,
    };
  }

  componentDidMount() {
    const { intial, id } = this.props;
    if (intial[id]) {
      const { deys, hour, minutes, sec } = intial[id];
      this.setState({ deys, hour, minutes, sec });
    }
  }

  componentWillUnmount() {
    const { id, onDefaultState } = this.props;
    const { deys, hour, minutes, sec } = this.state;
    onDefaultState({ [id]: { deys, hour, minutes, sec } });
  }

  newTimeInMinutes = () => {
    const { date } = this.state;
    const { time } = this.props;
    setInterval(() => {
      this.setState({ date: time });
    }, 60000);
    return date;
  };

  onEditTodo = (e) => {
    const { changeTodo, todo, index, id, time } = this.props;
    const { value, checked } = this.state;
    const v = e.target.value.trim();
    switch (e.type) {
      case 'keyup':
        if (e.key === 'Escape') {
          this.setState({ value: '' });
        }
        if (e.key === 'Enter' && v !== '') {
          changeTodo(value, {
            id,
            index,
            value: v,
            completed: false,
            edit: true,
            time,
          });
          this.setState({ value: '' });
        }
        break;
      case 'change':
        this.setState((prev) => {
          return {
            checked: !prev.checked,
          };
        });
        this.setState((prev) => {
          return {
            value: prev.value === 'completed' ? '' : 'completed',
          };
        });
        changeTodo('', {
          id,
          index,
          value: todo,
          completed: !checked,
          edit: false,
          time,
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

  onTimer = () => {
    this.setState((pre) => {
      clearInterval(this.timerId.current);
      const { key } = pre;
      if (key) {
        this.timerId.current = setInterval(() => {
          this.setState((prev) => {
            const { sec, minutes, hour, deys } = prev;
            if (hour === 23 && minutes === 59 && sec === 59) {
              return {
                sec: 0,
                minutes: 0,
                hour: 0,
                deys: deys + 1,
              };
            }
            if (minutes === 59) {
              return {
                sec: 0,
                minutes: 0,
                hour: hour + 1,
              };
            }
            if (sec === 59) {
              return {
                sec: 0,
                minutes: minutes + 1,
              };
            }

            return {
              sec: sec + 1,
            };
          });
        }, 1000);
      }

      return { key: !key };
    });
  };

  render() {
    const { todo, completed } = this.props;
    const { value, checked, key, sec, minutes, hour, deys } = this.state;
    return (
      <li className={completed ? 'completed' : value}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed ? true : checked}
            onChange={(e) => this.onEditTodo(e)}
          />
          <label htmlFor="domId">
            <span className="title">{todo}</span>
            <span className="description">
              <button onClick={this.onTimer} type="button" className={key ? 'icon icon-play' : 'icon icon-pause'}>
                {' '}
              </button>
              deys:{deys} {hour}:{minutes > 9 ? minutes : `0${minutes}`}:{sec > 9 ? sec : `0${sec}`}
            </span>

            <span className="created">{formatDistanceToNow(this.newTimeInMinutes())}</span>
          </label>
          <button
            aria-label="Mute volume"
            type="button"
            onClick={() => this.setState({ value: 'editing' })}
            className="icon icon-edit"
          />

          <button
            aria-label="Mute volume"
            type="button"
            onClick={(e) => this.onEditTodo(e)}
            className="icon icon-destroy"
          />
        </div>

        {value === 'editing' ? (
          <input autoFocus type="text" onKeyUp={(e) => this.onEditTodo(e)} className="edit" defaultValue={todo} />
        ) : null}
      </li>
    );
  }
}

// const elem = document.querySelector('.view');
// elem.addEventListener('click', (e) => {
//   console.log(e);
// });

Task.defaultProps = {
  changeTodo: Function.prototype,
  todo: '',
  index: 0,
  id: '',
  completed: false,
  time: '',
};
Task.propTypes = {
  changeTodo: PropTypes.func,
  todo: PropTypes.node,
  infex: PropTypes.number,
  id: PropTypes.string,
  completed: PropTypes.bool,
  time: PropTypes.instanceOf(Date),
};

export { Task };
