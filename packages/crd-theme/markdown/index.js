import * as React from 'react'
import cx from 'classnames'
import { MDXProvider } from '@mdx-js/react'
import { Helmet } from 'react-helmet'
import CodeBlock from './codeBlock'
import Link from './Link'
import styles from './style/index.less'

const { useState, useEffect, useRef } = React

const components = {
  code: CodeBlock,
  link: Link,
}

function Markdown(markdownProps) {
  const { props } = markdownProps
  const { relative, name } = props

  const getRmFirstSlashMarkdownName = () => {
    const relativeMd = relative
    if (!relativeMd) return null
    return relative.slice(1, relative.length - 3)
  }

  const getInitMarkdownCP = () => {
    const markdownName = getRmFirstSlashMarkdownName()
    if (!markdownName) return
    return () => require(`__project_root__/${markdownName}.md`).default
  }

  const [MarkdownCP, setMarkdownCP] = useState(getInitMarkdownCP())
  const markdownWrapperRef = useRef(null)

  const renderMarkdown = () => {
    const markdownName = getRmFirstSlashMarkdownName()
    if (!markdownName) return
    // it must be writen with / & .md in dynamic import
    import(`__project_root__/${markdownName}.md`).then((data) => {
      // data.default is a function, so we should write () => data.default in setState here.
      setMarkdownCP(() => (data.default || data))
    })
  }

  useEffect(() => {
    renderMarkdown()
  }, [getRmFirstSlashMarkdownName()])

  const getName = () => {
    return name ? name.replace('.md', '') : ''
  }

  return (
    <>
      <Helmet>
        <title>{getName()}</title>
        <meta name={getName()} content={getName()} />
      </Helmet>
      {
        MarkdownCP
          ? <div
            className={cx('markdown', styles.markdown, styles.markdownwrapper)}
            ref={markdownWrapperRef}
          >
            <MDXProvider
              components={components}
            >
              <MarkdownCP />
            </MDXProvider>
          </div>
          : null
      }
    </>
  )
}

export default Markdown
