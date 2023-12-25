const { GraphQLClient } = require('graphql-request')
const ora = require('ora')
const inquirer = require('inquirer')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

const {
  // request,
  getHeaders,
  // unicodeToChar,
  removeConfig,
  getConfig,
  setConfig,
} = require('./utils')

// use this plugin to close to the real login.
puppeteer.use(StealthPlugin())

const { country } = getConfig()

const usUrl = 'https://leetcode.com'
const cnUrl = 'https://leetcode-cn.com'
const baseUrl = country === 'us' ? usUrl : cnUrl
const graphqlUrl = `${baseUrl}/graphql`

const login = async () => {
  let loginUrl = baseUrl
  if (country === undefined) {
    loginUrl = (
      await inquirer.prompt({
        name: 'baseUrl',
        type: 'list',
        message: 'Log in to:',
        choices: [usUrl, cnUrl],
      })
    ).baseUrl
    setConfig({ country: loginUrl === cnUrl ? 'cn' : 'us' })
  }
  loginUrl += '/accounts/login/'

  const spinner = ora('Login...').start()
  try {
    // it have to set executablePath or it'll be broken.https://github.com/puppeteer/puppeteer/issues/6425
    // temporary way: https://stackoverflow.com/questions/47122579/run-puppeteer-on-already-installed-chrome-on-macos
    const browser = await puppeteer.launch({ headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
    const page = await browser.newPage()
    await page.goto(loginUrl)
    await page.waitForFunction('window.location.href.indexOf("login") === -1')
    let cookies = await page.cookies()
    await browser.close()
    spinner.stop()
    cookies = cookies.reduce((acc, cookie) => {
      const { name } = cookie
      acc[name] = cookie
      return acc
    }, {})
    setConfig({ cookies })
    return cookies
  } catch (error) {
    console.error('Login failure, retry...', error.message)
    throw error
  } finally {
    spinner.stop()
  }
}

const getCookie = async () => {
  // eslint-disable-line
  try {
    const { cookies } = getConfig()
    const { LEETCODE_SESSION } = cookies
    if (
      !LEETCODE_SESSION ||
      new Date(LEETCODE_SESSION.expires) <= new Date().getTime() / 1000
    ) {
      console.error('Cookie expires, retry...')
      removeConfig('cookies')
      return getCookie()
    }
    return Object.keys(cookies).reduce((acc, name) => {
      acc[name] = cookies[name].value
      return acc
    }, {})
  } catch (error) {
    const cookies = await login()
    return cookies
  }
}

const createGqlRequest = async () => {
  const cookies = await getCookie()
  const client = new GraphQLClient(graphqlUrl, {
    headers: getHeaders(cookies),
  })
  return client.request.bind(client)
}

// restful request
// const createRequest = async () => {
//   const cookies = await getCookie();
//   return url =>
//     request(url, {
//       headers: getHeaders(cookies),
//     });
// };
const filterAcQuestions = (questions = []) =>
  questions.filter(({ status }) => status === 'ac')

const getAllACQuestions = async () => {
  const gqlRequest = await createGqlRequest()
  const spinner = ora('Fetching all questions...').start()
  // interface see https://leetcode-cn.com/problems/add-two-numbers/
  const json = await gqlRequest(`{
    allQuestions{
      title
      titleSlug
      status
      difficulty
      questionId,
    }
  }`)
  spinner.stop()
  const questions = json.allQuestions || []
  return filterAcQuestions(questions)
}

// get details of ac code.
const getQuestionData = async (titleSlug) => {
  const qglRequest = await createGqlRequest()
  // interface from 'https://leetcode-cn.com/problems/add-two-numbers/'
  const json = await qglRequest(`{
    question(titleSlug: "${titleSlug}") {
      topicTags {
        name
        slug
      }
    }
  }`)
  const question = json.question || {}
  return question
}

module.exports = {
  login,
  getAllACQuestions,
  getQuestionData,
  getCookie,
}
