import highlight from 'highlight.js'
import frontMatter from 'front-matter'
import mdContainer from 'markdown-it-container'
import md from 'markdown-it'

console.log('✅✅✅✅✅✅✅')

const options = {
  className: 'wrap',
}

const mdLoader = md({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />)
  typographer: false,
  linkify: false, // Auto convert URL-like text to links
})
  .enable(['smartquotes'])
  .set({
    highlight(content: any, languageHint: any) {
      let highlightedContent = null

      highlight.configure({
        useBR: true,
        tabReplace: '    ',
      })

      if (languageHint && highlight.getLanguage(languageHint)) {
        try {
          highlightedContent = highlight.highlight(languageHint, content).value
        } catch (err) {
          console.log(err)
        }
      }

      if (!highlightedContent) {
        try {
          highlightedContent = highlight.highlightAuto(content).value
        } catch (err) {
          console.log(err)
        }
      }

      // 把代码中的{}转
      highlightedContent = highlightedContent.replace(
        /[{}]/g,
        (match: string) => `{'${match}'}`,
      )
      // 加上 highlight js
      highlightedContent = highlightedContent
        .replace('<code class="', '<code class="hljs ')
        .replace('<code>', '<code class="hljs">')

      return highlight.fixMarkup(highlightedContent)
    },
  })

/** at-component-docs__container 用于做除 demo 和 table 之外的公共样式 */
const formatModule = (imports: string, jsx: string) => {
  const moduleText = `
    ${imports}

    export default class extends React.Component {
      render(){
        return (
          <div className="${options.className}" style={{width: '100%'}}>
          <div className="at-component-docs__container">
            ${jsx}
            </div>
          </div>
        );
      }
    };`
  return moduleText
}

const formatOpening = () =>
  `</div>
  <div className="at-component__container">
    <div className="at-component__position">`
const formatClosing = () =>
  `</div></div><div className="at-component-docs__container">`

module.exports = function (source: any) {
  console.log('✅✅✅✅✅source')
  const {
    body,
    attributes: { imports: importMap },
  } = frontMatter(source)
  const imports = `import * as React from 'react';${importMap}`

  /* 处理 :::demo 开头的 markdown 内容 */
  mdLoader.use(mdContainer, 'demo', {
    validate: (params: string) => params.trim().match(/^demo\s*(.*)$/),
    render: (tokens: any[], idx: number) => {
      // container 从开头到结尾把之间的token跑一遍，其中idx定位到具体的位置
      // 有此标记代表 ::: 开始
      if (tokens[idx].nesting === 1) {
        let i = 1
        // 从 ::: 下一个token开始
        let token = tokens[idx + i]

        // 如果没有到结尾
        while (token.markup !== ':::') {
          i++
          token = tokens[idx + i]
        }
        // 描述也执行md
        return formatOpening()
      }
      return formatClosing()
    },
  })

  // md 处理过后的字符串含有 class 和 style ，需要再次处理给到 react
  let content = mdLoader.render(body)

  content = content
    .replace(/<hr>/g, '<hr />')
    .replace(/<br>/g, '<br />')
    .replace(/class=/g, 'className=')
    .replace(/style="text-align:center"/g, 'style={{ textAlign: "center"}}')
    .replace(/style="text-align:left"/g, 'style={{ textAlign: "left"}}')
    .replace(/style="text-align:right"/g, 'style={{ textAlign: "right"}}')
    .replace(/<a\s/g, `<a className='at-markdown-a' `)
    .replace(/>\(_blank\)/g, ` target="_blank">`)

  return `module.exports = ${formatModule(imports, content)}`
}
