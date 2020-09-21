// todo: use https://github.com/tsuz/json-to-markdown-table to convert json to markdown table
const fs = require('fs');
const ora = require('ora');
const { stringify } = require('./utils');
const { getAllACQuestions, getAcCode } = require('./leetcode');

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
      const { code, lang } = await getAcCode(current.titleSlug);
      // current.code = code;
      // current.lang = lang;
    } catch (error) {
      console.error(error.message);
    }
    spinner.text = `${questions.length - xs.length}/${questions.length}: [${
      current.title
    }] has downloaded.`;
    problems.push(current);
    fs.writeFileSync(problemsPath, stringify(problems));
    await aux(xs);
  };
  await aux([...questions]);
  spinner.stop();
};

// download({ all: true });
download({});
// module.exports = download;
