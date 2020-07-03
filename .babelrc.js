const babelrc = {
  presets: [
    [
      require.resolve("@babel/preset-env"),
      {
        targets: {
          browsers: ["last 2 versions", "ie >= 10"],
        },
      },
    ],
    // require.resolve("@babel/preset-react"),
    require.resolve("react-app"),
  ],
  plugins: [
    require.resolve("@babel/plugin-syntax-object-rest-spread"),
    require.resolve("@babel/plugin-syntax-dynamic-import"),
    require.resolve("@babel/plugin-transform-async-to-generator"),
    require.resolve("@babel/plugin-proposal-class-properties"),
    require.resolve("@babel/plugin-transform-runtime")
  ],
  env: {
    production: {},
  },
};

if (process.env.NODE_ENV === 'development') {
  // 不要包含多余的空格字符和行结束符。
  // 设置为“auto”时，对于大于500KB的输入大小，设置为"true"。
  // https://babeljs.io/docs/usage/api/#options
  babelrc.cacheDirectory = true;
} else {
  babelrc.compact = true;
}

module.exports = babelrc
