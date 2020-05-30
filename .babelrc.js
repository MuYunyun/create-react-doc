const babelrc = {
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "browsers": ["last 2 versions", "ie >= 10"]
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ],
  "env": {
    "production": {}
  },
}

if (process.env.NODE_ENV === 'development') {
  // 不要包含多余的空格字符和行结束符。
  // 设置为“auto”时，对于大于500KB的输入大小，设置为"true"。
  // https://babeljs.io/docs/usage/api/#options
  babelrc.cacheDirectory = true;
} else {
  babelrc.compact = true;
}

module.exports = babelrc
