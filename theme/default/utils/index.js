/**
 * judge if in client
 */
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/** detect a 'touch screen' device */
const isMobile = canUseDOM ? 'ontouchend' in window : false;

export { isMobile };
