const { docsConfig } = require("./path");

/**
 * This file is to collect post
 * [
 *  {title: ''}
 *  {url: ''}
 *  {content: ''}
 * ]
 *
 * 1. title, path => file name
 * 2. url, path => url
 * 3. content, path => get content(using fs)
 */
const generate = (path) => {
  const useSearchPlugin = docsConfig && docsConfig.search

}

export { generate }
