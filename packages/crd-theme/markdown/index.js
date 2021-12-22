import * as React from 'react'
import cx from 'classnames'
import { MDXProvider } from '@mdx-js/react'
import { Helmet } from 'react-helmet'
import CodeBlock from './codeBlock'
import Link from './Link'
import Loading from '../component/Loading'
import styles from './style/index.less'

const { useState, useEffect, useRef } = React

const components = {
  code: CodeBlock,
  link: Link,
}

function Markdown(markdownProps) {
  const { props } = markdownProps
  const { relative, name } = props
  const [MarkdownCP, setMarkdownCP] = useState(null)
  const markdownWrapperRef = useRef(null)

  const renderMarkdown = () => {
    const relativeMd = relative
    if (!relativeMd) return null

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

  const getName = () => {
    return name ? name.replace('.md', '') : ''
  }

  return (
    <>
      <Helmet>
        <title>{getName()}</title>
        <meta name={getName()} content={getName()} />
      </Helmet>
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
    </>
  )
}

export default Markdown
