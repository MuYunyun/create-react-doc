import * as React from 'react'
import { throttle } from '../utils'
import { supportSticky, stickyName } from './stickyfill'

const { useState, useEffect, useRef } = React

const Sticky = (
  {
    offsetTop,
    offsetBottom,
    children,
    target,
    onChange,
    nativeSticky = true,
    className,
    style,
    width
  },
  _ref: any
) => {
  const placeholderRef = useRef(null)
  const wrapperRef = useRef(null)
  const [positionStyle, setPositionStyle] = useState({})
  // 滚动元素
  let scrollElm: Window | HTMLElement = window
  // 是否是绝对布局模式
  const fixedRef = useRef(false)
  const [fixed, setFixed] = useState(fixedRef.current)
  const validValue = (value: any) => {
    return typeof value === 'number'
  }
  const setWrapperDimension = () => {
    const { width, height } = wrapperRef.current?.getBoundingClientRect() || {}
    placeholderRef.current &&
      ((placeholderRef.current as HTMLDivElement).style.height = `${height}px`)
    placeholderRef.current &&
      ((placeholderRef.current as HTMLDivElement).style.width = `${width}px`)
  }
  const handleScroll = () => {
    const rect = placeholderRef.current && placeholderRef.current.getBoundingClientRect()
    if (!rect) return
    let { top, bottom } = rect
    const style = { width: width ? width : '100%', zIndex: 999 }
    let containerTop = 0 // 容器距离视口上侧的距离
    let containerBottom = 0 // 容器距离视口下侧的距离

    if (scrollElm === window) {
      bottom = window.innerHeight - bottom
    } else {
      const containerRect = scrollElm && (scrollElm as HTMLElement).getBoundingClientRect()
      containerTop = containerRect?.top
      containerBottom = containerRect?.bottom
      top = top - containerTop // 距离容器顶部的距离
      bottom = containerBottom - bottom // 距离容器底部的距离
    }

    if (
      (validValue(offsetTop) && top <= offsetTop!) ||
      (validValue(offsetBottom) && bottom <= offsetBottom!)
    ) {
      if (!fixedRef.current) {
        style.position = 'fixed'
        validValue(offsetTop) && (style.top = offsetTop! + containerTop)
        validValue(offsetBottom) &&
          (style.bottom =
            scrollElm === window ? bottom : window.innerHeight - (containerBottom - offsetBottom!))
        onChange && onChange(true)
        updateFixed()
        setPositionStyle(style)
      }
    } else {
      if (fixedRef.current) {
        style.position = 'relative'
        onChange && onChange(false)
        updateFixed()
        setPositionStyle(style)
      }
    }
  }

  const updateFixed = () => {
    fixedRef.current = !fixedRef.current
    setFixed(fixedRef.current)
  }

  const scroll = throttle(handleScroll, 20)

  useEffect(() => {
    // 在子节点移开父节点后保持原来占位
    setWrapperDimension()
  }, [fixed])

  useEffect(() => {
    if (!nativeSticky || !supportSticky) {
      if (target) scrollElm = target()
      ;(scrollElm as any).addEventListener('scroll', scroll)
    }
    return () => {
      if (!nativeSticky || !supportSticky) {
        if (target) scrollElm = target()
        ;(scrollElm as any).removeEventListener('scroll', scroll)
      }
    }
  }, [offsetTop, offsetBottom])

  if (nativeSticky && supportSticky) {
    const style = {
      position: stickyName as any,
      zIndex: 999
    }
    validValue(offsetTop) && (style.top = offsetTop)
    validValue(offsetBottom) && (style.bottom = offsetBottom)
    return <div style={style}>{children}</div>
  }

  return (
    <div ref={placeholderRef} style={style} className={className}>
      <div ref={wrapperRef} style={positionStyle}>
        {children}
      </div>
    </div>
  )
}

export default React.forwardRef(Sticky)
