const { GraphQLClient } = require('graphql-request');
const fs = require('fs');
const nodeUrl = require('url');
const ora = require('ora');
const puppeteer = require('puppeteer');
const {
  request,
  getHeaders,
  unicodeToChar,
  getCookiePath,
} = require('./utils');

const baseUrl = 'https://leetcode-cn.com';
const graphqlUrl = `${baseUrl}/graphql`;

const login = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://leetcode-cn.com/accounts/login/');
  console.log('111');
  await page.waitForNavigation({
    timeout: 0,
  });
  console.log('222');
  await page.waitForNavigation({
    timeout: 0,
  });
  console.log('333');
  const cookies = await page.cookies();
  console.log('cookies_init', cookies);
  await browser.close();
  return cookies.reduce((acc, cookie) => {
    const { name } = cookie;
    acc[name] = cookie;
    return acc;
  }, {});
};

const getCookie = async () => {
  const cookiePath = getCookiePath();
  try {
    let json = fs.readFileSync(cookiePath);
    json = JSON.parse(json);
    const { cookies } = json;
    const { LEETCODE_SESSION } = cookies;
    if (
      !LEETCODE_SESSION ||
      new Date(LEETCODE_SESSION.expires) <= new Date().getTime() / 1000
    ) {
      console.error('Cookie expires, retry...');
      fs.unlinkSync(cookiePath);
      return getCookie();
    }
    return Object.keys(cookies).reduce((acc, name) => {
      acc[name] = cookies[name].value;
      return acc;
    }, {});
  } catch (error) {
    const spinner = ora('Login...');
    try {
      spinner.start();
      const cookies = await login();
      fs.writeFileSync(
        cookiePath,
        JSON.stringify({
          cookies,
        })
      );
      spinner.stop();
      return cookies;
      // eslint-disable-next-line no-shadow
    } catch (error) {
      spinner.stop();
      console.error('Login failure, retry...', error);
      return getCookie();
    }
  }
};

const createGqlRequest = async () => {
  const cookies = await getCookie();
  console.log('cookies', cookies);
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
const getAcCode = async (questionSlug) => {
  const qglRequest = await createGqlRequest();
  const json = await qglRequest(acCodeQuery(questionSlug));
  const submissions =
    (json.submissionList && json.submissionList.submissions) || [];
  const acSubmissions = submissions.filter(
    ({ statusDisplay }) => statusDisplay === 'Accepted'
  );
  if (acSubmissions.length > 0) {
    const { url } = acSubmissions[0];
    const submissionUrl = nodeUrl.resolve(baseUrl, url);
    const requestWithSession = await createRequest(submissionUrl);
    const response = await requestWithSession(submissionUrl);
    // NOTE unreliable
    const matches = response.body.match(
      /submissionCode\s*:\s*'([\s\S]*)'\s*,\s*editCodeUrl/
    );
    if (matches[1]) {
      return {
        code: unicodeToChar(matches[1]),
        ...acSubmissions[0],
      };
    }
  }
  return null;
};

module.exports = {
  getAllACQuestions,
  getAcCode,
  getCookie,
};
