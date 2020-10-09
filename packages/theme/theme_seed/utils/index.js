import isClient from 'diana/lib/isClient';

/** judge if is in mobile */
const isMobile = isClient() ? 'ontouchend' in window : false;

export { isMobile };
