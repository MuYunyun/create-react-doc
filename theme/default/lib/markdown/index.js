import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import styles from './style/index.less';
import InlineCode from './InlineCode';
import Link from './Link';
import Loading from '../../component/Loading/';

hljs.configure({
  tabReplace: '  ', // 2 spaces
  classPrefix: '', // don't append class prefix
});

const formatPath = path =>
  path.replace(/^(\/|\\)/, '')
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
    .split('/')
    .join('___');

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownStr: '',
    };
  }
  componentWillMount() {
    this.renderMarkdown();
  }
  renderMarkdown() {
    const { props: { type, relative } } = this.props;
    const relativeMd = relative;
    if (!relativeMd) return null;
    let filename = formatPath(relativeMd);
    if (type === 'directory') {
      filename = formatPath(relativeMd);
    }
    import(`__project_root__/.cache/md/${filename}.md`).then((data) => {
      this.setState({
        markdownStr: data.default || data,
      }, () => {
        let code = ReactDOM.findDOMNode(this);
        code = code.getElementsByTagName('code');
        for (let i = 0; i < code.length; i += 1) {
          if (code[i].parentNode && code[i].parentNode.tagName === 'PRE') {
            hljs.highlightBlock(code[i]);
          }
        }
      });
    });
  }
  render() {
    const { mdconf: { title, layout } } = this.props;
    const { markdownStr } = this.state;
    return (
      <div className={styles.markdownWapper}>
        {title && layout !== 'IndexLayout' && <h1 id={title} className={styles.pageTitle}>{title}</h1>}
        {markdownStr ? (
          <ReactMarkdown
            className={classNames('markdown', styles.markdown)}
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
              if (node.type === 'code' && parent.children && parent.children.length > 0 && parent.children[index - 1]) {
                const parentNode = parent.children[index - 1];
                if (parentNode.type === 'html' && /<!--\s?DemoStart\s?-->/.test(parentNode.value)) {
                  node.value = `__dome__${node.value}`;
                }
              }
              return node;
            }}
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
