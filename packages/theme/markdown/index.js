import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
// import ReactMarkdown from 'react-markdown'
// import hljs from 'highlight.js'
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from './codeBlock'
// import InlineCode from './InlineCode'
import Link from './Link'
import Loading from '../component/Loading'
import styles from './style/index.less'

// hljs.configure({
//   tabReplace: '  ', // 2 spaces
//   classPrefix: '', // don't append class prefix
// })

const formatPath = path =>
  path.replace(/^(\/|\\)/, '')
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
    .split('/')
    .join('___')

const components = {
  code: CodeBlock,
  link: Link,
}

function Markdown(markdownProps) {
  // const { props } = markdownProps
  const { props } = markdownProps
  const { relative } = props
  const [MarkdownCP, setMarkdownCP] = useState(null)
  const markdownWrapperRef = useRef(null)

  const renderMarkdown = () => {
    const relativeMd = relative
    if (!relativeMd) return null
    // let filename = formatPath(relativeMd)
    // if (type === 'directory') {
    //   filename = formatPath(relativeMd)
    // }
    // import(`__project_root__/.cache/md/${filename}.md`).then((data) => {
    // import(`__project_root__${relative}`).then((data) => {
    //   console.log('data', data)
    //   // data.default is a function, so we should write () => data.default in setState here.
    //   // setMarkdownCP(() => (data.default || data))
    // })

    const rmFirstSlash = relative.slice(1, relative.length - 3)
    // it must be writen with / & .md in dynamic import
    import(`__project_root__/${rmFirstSlash}.md`).then((data) => {
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

  return (
    <div className={cx('markdown', styles.markdown, styles.markdownwrapper)} ref={markdownWrapperRef}>
      {
        MarkdownCP
          ?
            <MDXProvider
              components={components}
            >
              <MarkdownCP />
            </MDXProvider>
          : <Loading />
      }
    </div>
  )
}

export default Markdown
