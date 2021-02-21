import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'
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
  const [markdownStr, setMarkdownStr] = useState('')
  const markdownWrapperRef = useRef(null)

  const renderMarkdown = () => {
    const relativeMd = relative
    if (!relativeMd) return null
    let filename = formatPath(relativeMd)
    if (type === 'directory') {
      filename = formatPath(relativeMd)
    }
    console.log('render markdown', `__project_root__/.cache/md/${filename}.md`)
    import(`__project_root__/.cache/md/${filename}.md`).then((data) => {
      setMarkdownStr(data.default || data)
    })
  }

  useEffect(() => {
    renderMarkdown()
  }, [])

  useEffect(() => {
    const code = markdownWrapperRef.current.getElementsByTagName('code')
    for (let i = 0; i < code.length; i += 1) {
      if (code[i].parentNode && code[i].parentNode.tagName === 'PRE') {
        hljs.highlightBlock(code[i])
      }
    }
  }, [markdownStr])

  return (
    <div className={styles.markdownwrapper} ref={markdownWrapperRef}>
      {markdownStr ? (
        <ReactMarkdown
          className={cx('markdown', styles.markdown)}
          source={markdownStr}
          escapeHtml={false}
          renderers={{
            code: InlineCode,
            link: Link,
            linkReference: Link,
          }}
          allowNode={(node, index, parent) => {
            if (node.type === 'html') {
              // if (/<!--([^]+?)-->/.test(node.value)) return false;
              // const scriptValue = node.value.match(/<script.*?>(.*?)<\/script>/ig);
              // node.value.replace(/<script.*?>(.*?)<\/script>/, (te) => {
              //   console.log('te:', te);
              // });
            }
            // 判断 上一个节点是否为 <!--DemoStart -->
            if (
              node.type === 'code' &&
              parent.children &&
              parent.children.length > 0 &&
              parent.children[index - 1]
            ) {
              const parentNode = parent.children[index - 1]
              if (
                parentNode.type === 'html' &&
                /<!--\s?DemoStart\s?-->/.test(parentNode.value)
              ) {
                node.value = `__dome__${node.value}`
              }
            }
            return node
          }}
        />
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Markdown
