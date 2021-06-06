// import classNames from 'classnames'
import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import styles from './InlineCode.less'

// export default class Canvas extends PureComponent {
//   constructor() {
//     super()
//     this.state = {
//       height: 0,
//     }
//     this.playerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`
//   }
//   onClick() {
//     this.setState({
//       height: this.state.height === 0 ? this.codeDom.clientHeight : 0,
//     })
//   }
//   render() {
//     const sourceCode = this.props.value || ''
//     // const code = sourceCode.replace(/^__dome__/, '').replace(/\\`/g, '`')
//     const code = sourceCode.replace(/\\`/g, '`')
//     const PreCode = height => (
//       <pre className={styles.highlight} style={{ height }}>
//         <code ref={node => this.codeDom = node} className={classNames('hljs', { [`language-${this.props.language}`]: this.props.language })}>
//           {code}
//         </code>
//       </pre>
//     )
//     // const isPreview = /^(html|htm)$/.test(this.props.language)

//     // if (/^__dome__/.test(sourceCode)) {
//     //   return (
//     //     <div className={styles.demo}>
//     //       {isPreview && (
//     //         <div className={styles.demoBody} id={this.playerId}>
//     //           <div dangerouslySetInnerHTML={{ __html: code }} />
//     //         </div>
//     //       )}
//     //       {PreCode(this.state.height)}
//     //       <div
//     //         className={classNames(styles.demoControl, {
//     //           [styles.isPreview]: !isPreview && this.state.height !== 0,
//     //         })}
//     //         onClick={this.onClick.bind(this)}
//     //       >
//     //         {this.state.height === 0 ? '显示' : '隐藏'}代码
//     //         {this.props.language && <div className={styles.language}>{this.props.language}</div>}
//     //       </div>
//     //     </div>
//     //   )
//     // }
//     return PreCode()
//   }
// }

export default ({ children, className }) => {
  const language = className.replace(/language-/, '')
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
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
