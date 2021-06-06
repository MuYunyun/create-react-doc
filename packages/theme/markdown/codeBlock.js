/** @jsxRuntime classic /
/* @jsx jsx */
import Highlight, { defaultProps } from 'prism-react-renderer'
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight'
import { mdx } from '@mdx-js/react'
// import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'

export default ({ children, className, live, render }) => {
  // const language = className.replace(/language-/, '')

  // if (live) {
  //   return (
  //     <div style={{marginTop: '40px', backgroundColor: 'black'}}>
  //       <LiveProvider
  //         code={children.trim()}
  //         transformCode={code => '/** @jsx mdx */' + code}
  //         scope={{mdx}}
  //       >
  //         <LivePreview />
  //         <LiveEditor />
  //         <LiveError />
  //       </LiveProvider>
  //     </div>
  //   )
  // }

  // if (render) {
  //   return (
  //     <div style={{ marginTop: '40px' }}>
  //       <LiveProvider code={children}>
  //         <LivePreview />
  //       </LiveProvider>
  //     </div>
  //   )
  // }

  return (
    <Highlight {...defaultProps} theme={nightOwlLight} code={children.trim()} language="javascript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '0 15px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
