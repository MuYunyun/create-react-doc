const fs = require('fs');
const ora = require('ora');
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
  let problems = [];
  let questions = await getAllACQuestions();
  console.log('questions', questions);
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
      current.code = code;
      current.lang = lang;
    } catch (error) {
      console.error(error);
    }
    spinner.text = `${questions.length - xs.length}/${questions.length}: [${
      current.title
    }] has downloaded.`;
    problems.push(current);
    fs.writeFileSync(problemsPath, JSON.stringify(problems));
    await aux(xs);
  };
  await aux([...questions]);
  spinner.stop();
};

download({ all: true });
// module.exports = download;
