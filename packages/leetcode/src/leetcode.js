const { GraphQLClient } = require('graphql-request');
const nodeUrl = require('url');
const ora = require('ora');
const inquirer = require('inquirer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const {
  request,
  getHeaders,
  unicodeToChar,
  removeConfig,
  getConfig,
  setConfig,
} = require('./utils');

// use this plugin to close to the real login.
puppeteer.use(StealthPlugin());

const { country } = getConfig();

const usUrl = 'https://leetcode.com';
const cnUrl = 'https://leetcode-cn.com';
const baseUrl = country === 'us' ? usUrl : cnUrl;
const graphqlUrl = `${baseUrl}/graphql`;

const login = async () => {
  let loginUrl = baseUrl;
  if (country === undefined) {
    loginUrl = (
      await inquirer.prompt({
        name: 'baseUrl',
        type: 'list',
        message: 'Log in to:',
        choices: [usUrl, cnUrl],
      })
    ).baseUrl;
    setConfig({ country: loginUrl === cnUrl ? 'cn' : 'us' });
  }
  loginUrl += '/accounts/login/';

  const spinner = ora('Login...').start();
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(loginUrl);
    await page.waitForFunction('window.location.href.indexOf("login") === -1');
    let cookies = await page.cookies();
    await browser.close();
    spinner.stop();
    cookies = cookies.reduce((acc, cookie) => {
      const { name } = cookie;
      acc[name] = cookie;
      return acc;
    }, {});
    setConfig({ cookies });
    return cookies;
  } catch (error) {
    console.error('Login failure, retry...', error.message);
    throw error;
  } finally {
    spinner.stop();
  }
};

const getCookie = async () => {
  // eslint-disable-line
  try {
    const { cookies } = getConfig();
    const { LEETCODE_SESSION } = cookies;
    if (
      !LEETCODE_SESSION ||
      new Date(LEETCODE_SESSION.expires) <= new Date().getTime() / 1000
    ) {
      console.error('Cookie expires, retry...');
      removeConfig('cookies');
      return getCookie();
    }
    return Object.keys(cookies).reduce((acc, name) => {
      acc[name] = cookies[name].value;
      return acc;
    }, {});
  } catch (error) {
    const cookies = await login();
    return cookies;
  }
};

const createGqlRequest = async () => {
  const cookies = await getCookie();
  const client = new GraphQLClient(graphqlUrl, {
    headers: getHeaders(cookies),
  });
  return client.request.bind(client);
};

const createRequest = async () => {
  const cookies = await getCookie();
  return url =>
    request(url, {
      headers: getHeaders(cookies),
    });
};

const getAllACQuestions = async () => {
  const gqlRequest = await createGqlRequest();
  const spinner = ora('Fetching all questions...').start();
  const json = await gqlRequest(`{
    allQuestions{
      title
      titleSlug
      status
      content
    }
  }`);
  spinner.stop();
  const filterAcQuestions = (questions = []) =>
    questions.filter(({ status }) => status === 'ac');
  const questions = json.allQuestions || [];
  return filterAcQuestions(questions);
};
const acCodeQuery = (questionSlug) => {
  const query = `{
    submissionList(offset:0,limit:10, questionSlug: "${questionSlug}"){
      submissions{
        lang
        title
        url
        statusDisplay
        id
      }
    }
  }`;
  return query;
};
const getSubmissionCode = async ({ url, id } = {}, isUS = true) => {
  if (isUS) {
    const submissionUrl = nodeUrl.resolve(baseUrl, url);
    const requestWithSession = await createRequest(submissionUrl);
    const response = await requestWithSession(submissionUrl);
    // NOTE unreliable
    const matches = response.body.match(
      /submissionCode\s*:\s*'([\s\S]*)'\s*,\s*editCodeUrl/
    );
    if (matches[1]) {
      return unicodeToChar(matches[1]);
    }
  }
  const gqlRequest = await createGqlRequest();
  const json = await gqlRequest(`{
    submissionDetail(submissionId: ${id}) {
      id
      code
      statusDisplay
    }
  }`);
  const detail = json.submissionDetail || {};
  return detail.code;
};

const getAcCode = async (questionSlug) => {
  const qglRequest = await createGqlRequest();
  const json = await qglRequest(acCodeQuery(questionSlug));
  const submissions =
    (json.submissionList && json.submissionList.submissions) || [];
  const acSubmissions = submissions.filter(
    ({ statusDisplay }) => statusDisplay === 'Accepted'
  );
  if (acSubmissions.length > 0) {
    const code = await getSubmissionCode(acSubmissions[0], country === 'us');
    return {
      code,
      ...acSubmissions[0],
    };
  }
  return null;
};

module.exports = {
  login,
  getAllACQuestions,
  getAcCode,
  getCookie,
};
