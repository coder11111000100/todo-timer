import { useEffect, useRef, useState } from 'react';

function useTimer(m, s, id) {
  const [timer, setTimer] = useState({
    minutes: m || 0,
    seconds: s || 0,
    direction: false,
    id,
    key: false,
    locked: false,
  });
  const timerId = useRef(null);

  const onTimer = () => {
    if (timer.locked) {
      clearInterval(timerId.current);
      return;
    }
    setTimer((prev) => ({ ...prev, key: !prev.key }));
    if (!timer.direction) {
      clearInterval(timerId.current);
      timerId.current = setInterval(() => {
        setTimer((prev) => {
          const { seconds, minutes, key } = prev;
          if (!key) {
            clearInterval(timerId.current);
            return { ...prev };
          }
          if (minutes === 0 && seconds === 0) {
            clearInterval(timerId.current);
            return {
              ...prev,
              seconds: 0,
              minutes: 0,
              direction: true,
              key: false,
            };
          }
          if (minutes === 0) {
            return {
              ...prev,
              seconds: seconds - 1,
              minutes: 0,
            };
          }
          if (seconds === 0) {
            return {
              ...prev,
              seconds: 59,
              minutes: minutes - 1,
            };
          }

          return {
            ...prev,
            seconds: seconds - 1,
          };
        });
      }, 1000);
    }
    if (timer.direction) {
      clearInterval(timerId.current);
      timerId.current = setInterval(() => {
        setTimer((prev) => {
          const { seconds, minutes, key } = prev;
          if (!key) {
            clearInterval(timerId.current);
            return { ...prev };
          }
          if (seconds === 59) {
            return {
              ...prev,
              seconds: 0,
              minutes: minutes + 1,
            };
          }

          return {
            ...prev,
            seconds: seconds + 1,
          };
        });
      }, 1000);
    }
  };

  onTimer.lock = () => {
    setTimer((prev) => {
      clearInterval(timerId.current);
      return { ...prev, locked: true, key: false };
    });
  };
  onTimer.unLock = () => {
    setTimer((prev) => {
      clearInterval(timerId.current);
      return { ...prev, locked: false };
    });
  };

  useEffect(() => {
    setTimer((prev) => ({ ...prev, direction: localStorage.getItem(prev.id) }));
  }, []);

  useEffect(() => {
    if (timer.minutes === 0 && timer.seconds === 0 && !timer.direction) {
      localStorage.setItem(timer.id, 'direction-right');
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timer]);

  return [{ ...timer }, onTimer];
}

export { useTimer };
