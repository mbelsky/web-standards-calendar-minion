const { error } = require('dotenv-safe').config()

if (error) {
  throw error
}

const { Octokit } = require('@octokit/rest')
const constants = require('./constants')
const toBase64 = require('./toBase64')

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
  userAgent: process.env.GITHUB_USER_AGENT,
})

const originOwner = process.env.GITHUB_ORIGIN_OWNER
const repoName = process.env.GITHUB_REPO_NAME
const upstreamOwner = process.env.GITHUB_UPSTREAM_OWNER

const masterBranchRef = 'heads/master'

const makePullRequestUnsafe = async (yamlFileData) => {
  const { filename, output } = yamlFileData
  const commitMessage = 'Добавляет ' + filename

  const response = await octokit.git.getRef({
    owner: upstreamOwner,
    repo: repoName,
    ref: masterBranchRef,
  })
  const upstreamMasterSHA = response.data.object.sha

  // create a branch
  await octokit.git.createRef({
    owner: originOwner,
    repo: repoName,
    ref: 'refs/heads/' + filename,
    sha: upstreamMasterSHA,
  })

  await octokit.repos.createOrUpdateFile({
    owner: originOwner,
    repo: repoName,
    branch: filename,
    content: toBase64(output),
    message: commitMessage,
    path: 'events/' + filename,
  })

  const prCreationResponse = await octokit.pulls.create({
    owner: upstreamOwner,
    repo: repoName,
    title: commitMessage,
    head: filename,
    base: 'master',
    maintainer_can_modify: true,
  })

  return {
    status: 'success',
    message: constants.messagePrSucceeded(prCreationResponse.data.html_url),
  }
}

const makePullRequest = (yamlFileData) =>
  makePullRequestUnsafe(yamlFileData).catch((e) => {
    // TODO: report exception
    console.log(e)
    return {
      status: 'error',
      message: constants.messagePrFailed,
    }
  })

module.exports = {
  makePullRequest,
}
