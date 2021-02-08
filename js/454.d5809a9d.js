(self.webpackChunkcreate_react_doc=self.webpackChunkcreate_react_doc||[]).push([[454],{91454:n=>{n.exports="## 其它工具\n\n### crd-leetcode-cli\n\n#### 背景\n\n当新增 LeetCode 题解时需要[手动更新表格](https://github.com/MuYunyun/blog/blob/main/LeetCode/README.md), 较为不便。[crd-leetcode-cli](https://github.com/MuYunyun/create-react-doc/tree/main/packages/leetcode-cli) 提供了更新 leetcode 站点中已 ac 题解的能力。\n\n#### 安装\n\n执行 `yarn add crd-leetcode-cli -g`, 国内用户可以执行 `cnpm install crd-leetcode-cli -g`\n\n#### 使用\n\n```bash\nleetcode download       // 增量拉取 AC 题目(若无登录, 则会先执行登录逻辑)\nleetcode download -a    // 全量拉取 AC 题目\nleetcode login          // 登录\nleetcode logout         // 登出\n```\n\n#### 自定义渲染表格\n\n插件提供了自定义渲染 markdown table 的能力。\n\n在项目根目录创建 [config.js](https://github.com/MuYunyun/blog/blob/main/config.js) 文件。\n\n在 config.js 内自定义生成 markdown 的 [transform_markdown_table 函数](https://github.com/MuYunyun/blog/blob/main/config.js#L5-L22)。\n\n```js\nconst transform_markdown_table = (dataArr: QuestionProps[]): string => {}\nmodule.exports = { transform_markdown_table }\n```\n\nQuestionProps 接口定义如下:\n\n|    名称    |       含义       |  例子   |\n| :--------: | :--------------: | :-----: |\n| questionId |       题号       |         |\n|   title    |       标题       | Two Sum |\n| titleSlug  | 标题的另一种模式 | two-sum |\n| difficulty |       难度       |         |\n| topicTags  |   题目所属标签   |         |\n\n通过自定义 transform_markdown_table 函数, 便可得到如下 markdown table:\n\n![](http://with.muyunyun.cn/1938e43a45410090e8486e495e6d9fee.jpg)\n\n#### 技术细节\n\n* 使用 puppeteer 登录 leetcode 获取 cookie 信息。\n* 获取 cookie 后, 使用 graphql-request 调用 graphql 接口获取题目详情信息。\n* 自定义生成 markdown table。"}}]);