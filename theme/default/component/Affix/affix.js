import * as React from 'react';
import { throttle } from './utils';

const { useState, useLayoutEffect, useRef } = React;

const Affix = ({
  offsetTop,
  offsetBottom,
  children,
  target,
  onChange,
  className,
  wrapperClassName,
  style,
  width,
  affixStyle,
}) => {
  const placeholderRef = useRef(null);
  const wrapperRef = useRef(null);
  const widthRef = useRef(width);
  const [positionStyle, setPositionStyle] = useState({});
  // 滚动元素
  let scrollElm = window;
  // 是否是绝对布局模式
  const fixedRef = useRef(false);
  const [fixed, setFixed] = useState(fixedRef.current);
  useLayoutEffect(() => {
    widthRef.current = width;
  }, [width]);
  const validValue = (value) => {
    return typeof value === 'number';
  };
  const setWrapperDimension = () => {
    // eslint-disable-next-line no-shadow
    const { width: wrapperRefWidth, height: wrapperRefHeight } = wrapperRef.current
      ? wrapperRef.current.getBoundingClientRect()
      : {};
    placeholderRef.current &&
      (placeholderRef.current.style.height = `${wrapperRefHeight}px`);
    placeholderRef.current &&
      (placeholderRef.current.style.width =
        typeof width === 'number' ? `${width}px` : `${wrapperRefWidth}px`);
    wrapperRef.current &&
      (wrapperRef.current.style.width =
        typeof width === 'number' ? `${width}px` : `${wrapperRefWidth}px`);
  };
  const updateFixed = () => {
    fixedRef.current = !fixedRef.current;
    setFixed(fixedRef.current);
  };
  const handleScroll = () => {
    const rect =
      placeholderRef.current && placeholderRef.current.getBoundingClientRect();
    if (!rect) return;
    let { top, bottom } = rect;
    const updatePositionStyle = {
      width:
        typeof widthRef.current === 'number'
          ? widthRef.current
          : placeholderRef.current &&
            placeholderRef.current.getBoundingClientRect().width,
      zIndex: 999,
    };
    let containerTop = 0; // 容器距离视口上侧的距离
    let containerBottom = 0; // 容器距离视口下侧的距离

    if (scrollElm === window) {
      bottom = window.innerHeight - bottom;
    } else {
      const containerRect = scrollElm && scrollElm.getBoundingClientRect();
      containerTop = containerRect && containerRect.top;
      containerBottom = containerRect && containerRect.bottom;
      top -= containerTop; // 距离容器顶部的距离
      bottom = containerBottom - bottom; // 距离容器底部的距离
    }

    if (
      (validValue(offsetTop) && top <= offsetTop) ||
      (validValue(offsetBottom) && bottom <= offsetBottom)
    ) {
      if (!fixedRef.current) {
        updatePositionStyle.position = 'fixed';
        validValue(offsetTop) && (updatePositionStyle.top = offsetTop + containerTop);
        validValue(offsetBottom) &&
          (updatePositionStyle.bottom =
            scrollElm === window
              ? bottom
              : window.innerHeight - (containerBottom - offsetBottom));
        onChange && onChange(true);
        updateFixed();
        setPositionStyle(updatePositionStyle);
      }
    } else if (fixedRef.current) {
      updatePositionStyle.position = 'relative';
      onChange && onChange(false);
      updateFixed();
      setPositionStyle(updatePositionStyle);
    }
  };

  const scroll = throttle(handleScroll, 20);

  useLayoutEffect(() => {
    // 在子节点移开父节点后保持原来占位
    setWrapperDimension();
  }, [fixed, width]);

  useLayoutEffect(() => {
    if (target) scrollElm = target();
    scrollElm.addEventListener('scroll', scroll);
    return () => {
      if (target) scrollElm = target();
      scrollElm.removeEventListener('scroll', scroll);
    };
  }, [offsetTop, offsetBottom]);

  return (
    <div ref={placeholderRef} style={style} className={className}>
      <div
        ref={wrapperRef}
        className={wrapperClassName}
        style={{ ...{ position: 'relative' }, ...positionStyle, ...affixStyle }}
      >
        {children}
      </div>
    </div>
  );
};

export default Affix;
