### crd-leetcode-cli

crd-leetcode-cli 提供将 leetcode 已 ac 的题目转化为 markdown 表格的能力。

### Install

执行 `yarn add crd-leetcode-cli -g`, 国内用户可以执行 `cnpm install crd-leetcode-cli -g`

### Usage

```
leetcode download       // 增量拉取 leetcode ac 题目的信息(若无登录, 则会先执行登录逻辑)
leetcode download -a    // 全量拉取 leetcode ac 题目的信息
leetcode login          // 登录 leetcode
leetcode logout         // 登出 leetcode
```

### Step

* 使用 puppeteer 登录
  * ![](http://with.muyunyun.cn/f9301658ff81e6d47dcaab3684cab1ce.jpg)
* 生成 [leetcode ac table](https://github.com/MuYunyun/blog/tree/master/LeetCode)
  * ![](http://with.muyunyun.cn/0dd6ef8677ddcbd904cff9a23722df18.jpg)

* [使用案例](https://github.com/MuYunyun/blog/blob/master/package.json#L8-L9)