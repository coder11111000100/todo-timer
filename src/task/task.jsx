/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

class Task extends React.Component {
  constructor(props) {
    console.log(props, 'constructor')
    const {createWithNull} = props

    super(props);
    this.timerId = React.createRef(null);
    this.timerMimutesId = React.createRef(null);
    this.input = React.createRef(null);
    this.state = {
      value: '',
      date: props.time,
      checked: false,
      key: true,
      hasEqualToZero: !createWithNull,
      sec: undefined,
      minutes: undefined,
    };
  }

  componentDidMount() {
    console.log('mount');
    const { minutes, sec } = this.props;
    this.setState({ minutes, sec });
  }

  componentWillUnmount() {
    console.log('Unmount');
    clearInterval(this.timerMimutesId.current);
    clearInterval(this.timerId.current);
    const { id, oncurrentTimer } = this.props;
    const { minutes, sec } = this.state;
    if (minutes !== undefined || sec !== undefined) {
      oncurrentTimer(id, minutes, sec);
    }
  }

  newTimeInMinutes = () => {
    const { date } = this.state;
    const { time } = this.props;
    this.timerMimutesId.current = setInterval(() => {
      this.setState({ date: time });
    }, 60000);
    return date;
  };

  onEditTodo = (e) => {
    const { changeTodo, todo, index, id, time, createWithNull } = this.props;
    const { value, checked } = this.state;
    if (this.input.current.checked) {
      clearInterval(this.timerId.current);
      this.setState({ key: true });
    } else {
      clearInterval(this.timerId.current);
      this.setState({ key: true });
    }
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
            createWithNull
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
          createWithNull
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
    const { sec: s, minutes: m, id, oncurrentTimer } = this.props;
    const { hasEqualToZero } = this.state;
    if (this.input.current.checked) {
      clearInterval(this.timerId.current);
      this.setState({ key: true });
      return;
    }

    if (m !== 0 || (s !== 0 && hasEqualToZero)) {
      console.log('-1');
      this.setState((pre) => {
        clearInterval(this.timerId.current);
        const { key } = pre;
        if (key) {
          this.timerId.current = setInterval(() => {
            this.setState((prev) => {
              const { sec, minutes } = prev;
              if (minutes === 0 && !sec) {
                clearInterval(this.timerId.current);
                oncurrentTimer(id, minutes, sec);
                return {
                  sec: 0,
                  minutes: 0,
                  key: true,
                };
              }
              if (minutes === 0) {
                return {
                  sec: sec - 1,
                  minutes: 0,
                };
              }
              if (sec === 0 && minutes > 0) {
                return {
                  sec: 59,
                  minutes: minutes - 1,
                };
              }

              return {
                sec: sec - 1,
              };
            });
          }, 1000);
        }

        return { key: !key };
      });
      return;
    }

    if (!hasEqualToZero) {
      console.log('+1');
      this.setState((pre) => {
        clearInterval(this.timerId.current);
        const { key } = pre;
        if (key) {
          this.timerId.current = setInterval(() => {
            this.setState((prev) => {
              const { sec, minutes } = prev;
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
    }
  };

  render() {
    const { todo, completed } = this.props;
    const { value, checked, key, sec, minutes } = this.state;
    return (
      <li className={completed ? 'completed' : value}>
        <div className="view">
          <input
            ref={this.input}
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
              {minutes > 9 ? minutes : `0${minutes}`}:{sec > 9 ? sec : `0${sec}`}
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

Task.defaultProps = {
  changeTodo: Function.prototype,
  oncurrentTimer: Function.prototype,
  todo: '',
  index: 0,
  id: '',
  completed: false,
  time: new Date(),
  sec: undefined,
  minutes: undefined,
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
  minutes: PropTypes.number || PropTypes.undefined,
};

export { Task };
