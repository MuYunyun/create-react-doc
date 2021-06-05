import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'
import { renderToString } from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react'
import InlineCode from './InlineCode'
import Link from './Link'
import Loading from '../component/Loading'
import styles from './style/index.less'
// import A from '../../../.cache/md/docs___快速上手.md'

// console.log('abcde', a)

hljs.configure({
  tabReplace: '  ', // 2 spaces
  classPrefix: '', // don't append class prefix
})

const formatPath = path =>
  path.replace(/^(\/|\\)/, '')
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
    .split('/')
    .join('___')

function Markdown({ props }) {
  const { type, relative } = props
  const [MarkdownCP, setMarkdownCP] = useState(null)
  const markdownWrapperRef = useRef(null)

  const renderMarkdown = () => {
    const relativeMd = relative
    if (!relativeMd) return null
    let filename = formatPath(relativeMd)
    if (type === 'directory') {
      filename = formatPath(relativeMd)
    }
    import(`__project_root__/.cache/md/${filename}.md`).then((data) => {
      // data.default is a function, so we should write () => data.default in setState here.
      setMarkdownCP(() => (data.default || data))
    })
  }

  useEffect(() => {
    renderMarkdown()
  }, [])

  // useEffect(() => {
  //   const code = markdownWrapperRef.current.getElementsByTagName('code')
  //   for (let i = 0; i < code.length; i += 1) {
  //     if (code[i].parentNode && code[i].parentNode.tagName === 'PRE') {
  //       hljs.highlightBlock(code[i])
  //     }
  //   }
  // }, [markdownStr])

  // console.log('markdownStr', markdownStr)
  // { /* {markdownStr ? (
  //   // <ReactMarkdown
  //   //   className={cx('markdown', styles.markdown)}
  //   //   source={markdownStr}
  //   //   // escapeHtml={false}
  //   //   renderers={{
  //   //     code: InlineCode,
  //   //     link: Link,
  //   //     linkReference: Link,
  //   //   }}
  //   // />
  //   <div>123</div>
  // ) : (
  //   <Loading />
  // )} */ }
  return (
    <div className={styles.markdownwrapper} ref={markdownWrapperRef}>
      {
        MarkdownCP
          ?
            <MDXProvider>
              <MarkdownCP />
            </MDXProvider>
          : <Loading />
      }
    </div>
  )
}

export default Markdown
