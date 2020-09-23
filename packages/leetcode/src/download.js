// todo: use https://github.com/tsuz/json-to-markdown-table to convert json to markdown table
const fs = require('fs');
const ora = require('ora');
const { transformToMarkdownTable } = require('./utils');
// const { getAllACQuestions, getQuestionData } = require('./leetcode');
const { getAllACQuestions } = require('./leetcode');
const {
  paths,
} = require('crd-scripts');

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
    // todo: https://github.com/beizhedenglong/leetcode-site-generator/issues/10
    try {
      // const { topicTags } = await getQuestionData(current.titleSlug);
      // console.log('topicTags', topicTags);
      // current.code = code;
      // current.lang = lang;
    } catch (error) {
      console.error(error.message);
    }
    spinner.text = `${questions.length - xs.length}/${questions.length}: [${
      current.title
    }] has downloaded.`;
    problems.push(current);
    if (paths.leetcodeReadme) {
      fs.writeFileSync('leetcode-table.md', transformToMarkdownTable(problems));
    }
    await aux(xs);
  };
  await aux([...questions]);
  spinner.stop();
};

module.exports = download;
