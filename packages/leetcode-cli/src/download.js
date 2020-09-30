/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const ora = require('ora');
const { transformToMarkdownTable, stringify } = require('./utils');
const { getAllACQuestions, getQuestionData } = require('./leetcode');
const { resolveApp } = require('crd-utils');

const difference = (problemsA = [], problemsB = []) => {
  const map = problemsB.reduce((acc, problem) => {
    acc[problem.titleSlug] = true;
    return acc;
  }, {});
  return problemsA.filter(problem => !map[problem.titleSlug]);
};
const download = async (command) => {
  const problemsPath = 'problems.json';
  // get incremental problems through comapre json
  let problems = [];
  let questions = await getAllACQuestions();
  if (!command.all) {
    if (fs.existsSync(problemsPath)) {
      problems = JSON.parse(fs.readFileSync(problemsPath));
    }
    questions = difference(questions, problems);
  }

  const spinner = ora('Downloading accepted code...\n').start();
  const aux = async (xs = []) => {
    if (xs.length === 0) {
      return;
    }
    const current = xs.shift();
    try {
      const { topicTags } = await getQuestionData(current.titleSlug);
      const result = topicTags.reduce((prev, cur) => {
        if (prev === '') return cur.name;
        return `${prev}, ${cur.name}`;
      }, '');
      current.topicTags = result;
    } catch (error) {
      console.error(error.message);
    }
    spinner.text = `${questions.length - xs.length}/${questions.length}: [${
      current.title
    }] has downloaded.`;
    problems.push(current);
    // it can be extracted in to config if there is need.
    let leetcodeReadme = 'leetcode-table.md';
    if (fs.existsSync(resolveApp('LeetCode/README.md'))) {
      leetcodeReadme = resolveApp('LeetCode/README.md');
    }
    let transformMarkdownTable = transformToMarkdownTable;
    let transformMarkdownTable = () => {};
    if (fs.existsSync(resolveApp('config.js'))) {
      transformMarkdownTable = require(resolveApp('config.js')).transform_markdown_table;
    }
    fs.writeFileSync(leetcodeReadme, transformMarkdownTable(problems));
    // the problemsPath is to get incremental data.
    fs.writeFileSync(problemsPath, stringify(problems));
    await aux(xs);
  };
  await aux([...questions]);
  spinner.stop();
};

module.exports = download;
