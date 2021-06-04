import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'
import { renderToString } from 'react-dom/server'
import InlineCode from './InlineCode'
import Link from './Link'
import Loading from '../component/Loading'
import styles from './style/index.less'

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
  const [markdownStr, setMarkdownStr] = useState(null)
  const markdownWrapperRef = useRef(null)

  const renderMarkdown = () => {
    const relativeMd = relative
    if (!relativeMd) return null
    let filename = formatPath(relativeMd)
    if (type === 'directory') {
      filename = formatPath(relativeMd)
    }
    import(`__project_root__/.cache/md/${filename}.md`).then((data) => {
      console.log('data', data)
      setMarkdownStr(data.default || data)
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

  console.log('markdownStr', markdownStr)
  return (
    <div className={styles.markdownwrapper} ref={markdownWrapperRef}>
      {markdownStr ? (
        // <ReactMarkdown
        //   className={cx('markdown', styles.markdown)}
        //   source={markdownStr}
        //   // escapeHtml={false}
        //   renderers={{
        //     code: InlineCode,
        //     link: Link,
        //     linkReference: Link,
        //   }}
        // />
        <div>123</div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Markdown
