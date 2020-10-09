import * as React from 'react';
import styles from './style/index.less';

const { useLayoutEffect, useRef, useCallback } = React;

const ANIMATION_DURATION = 200;

export default function Transition({
  isShow,
  children,
}) {
  const mounted = useRef(false);
  const collapseRef = useRef(null);
  const timer = useRef({});

  // prepare
  const beforeEnter = () => {
    const el = collapseRef.current;
    el.style.height = '0px';
  };

  const afterEnter = useCallback(() => {
    const el = collapseRef.current;
    el.style.display = 'block';
    el.style.height = '';
  }, []);

  // start
  const enter = useCallback(() => {
    const el = collapseRef.current;
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
    }

    timer.current.enterTimer = setTimeout(() => afterEnter(), ANIMATION_DURATION);
  }, [afterEnter]);

  const beforeLeave = useCallback(() => {
    const el = collapseRef.current;

    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
    }
  }, []);

  const afterLeave = useCallback(() => {
    const el = collapseRef.current;

    el.style.display = 'none';
    el.style.height = '';
  }, []);

  const leave = useCallback(() => {
    const el = collapseRef.current;
    if (el.scrollHeight !== 0) {
      el.style.height = '0px';
    }
    timer.current.leaveTimer = setTimeout(() => afterLeave(), ANIMATION_DURATION);
  }, [afterLeave]);

  const triggerChange = useCallback(
    // eslint-disable-next-line no-shadow
    (isShow) => {
      clearTimeout(timer.current.enterTimer);
      clearTimeout(timer.current.leaveTimer);
      if (isShow) {
        beforeEnter();
        enter();
      } else {
        beforeLeave();
        leave();
      }
    },
    [beforeLeave, enter, leave]
  );

  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      beforeEnter();
      if (isShow) {
        enter();
      }
    } else {
      triggerChange(isShow);
    }
  }, [enter, isShow, triggerChange]);

  return (
    <div className={styles['collapse-transition']} ref={collapseRef}>
      {children}
    </div>
  );
}
