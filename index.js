const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub Username"
    },
    {
      type: "input",
      name: "githubRepo",
      message: "What is your Github project repository?"
    },
    { 
      type: "input",
      name: "projectTitle",
      message: "Enter project's title?"
    },
    { 
      type: "input",
      name: "description",
      message: "Enter project's description?"
    },
    {
      type: "input",
      name: "installation",
      message: "Enter project installation instruction?"
    },
    {
      type: "input",
      name: "usage",
      message: "Enter project usage?"
    },
    {
      type: "input",
      name: "licence",
      message: "Enter project licence details?"
    },
    {
      type: "input",
      name: "contribution",
      message: "How can others contribute to the project?"
    },
    {
      type: "input",
      name: "tests",
      message: "Enter project testing details?"
    },
    {
      type: "input",
      name: "githubEmail",
      message: "Enter contact email for questions?"
    },
  ]);
}
// To DO Section below to be updated from HTML to MarkDown 
async function generateReadMe(answers) {
/**badges:
 * repos 
data.update_at
data.language
data.forks
data.watchers
data.open_issues
data.owner.avatar_url
 * users
data.email 
**/
  let readMeData = `
  # ${projectTitle}
  [![Github Update](${updatedBadgeUrl})]
  [![Github Forks](${forksBadgeUrl})]

  ## 
`;
}

async function init() {

  try {
    const answers = await promptUser();
    const queryRepoUrl = `https://api.github.com/repos/${answers.githubUsername}/${answers.githubRepo}`;
    console.log(queryRepoUrl);
    
    const response = await axios.get(queryRepoUrl);
    const githubRepoData = response.data;
    // const updatedAt = githubRepoData.updated_at;
    // .split("T")[0];
    let updatedAt = new Date (githubRepoData.updated_at);
    updatedAt = updatedAt.getDate()+'-' + (updatedAt.getMonth()+1) + '-'+updatedAt.getFullYear();
    console.log(updatedAt);
    const updatedBadgeUrl = `https://img.shields.io/static/v1?label=Updated%20at&message=${updatedAt}&color=blue?style=social&logo=github`
    console.log(updatedBadgeUrl);
    
    const forks = githubRepoData.forks;
    const forksBadgeUrl = `https://img.shields.io/static/v1?label=Forks&message=${forks}&color=green?style=social&logo=github`
    console.log(forksBadgeUrl);
    
    
  } catch(err) {
    console.error(err);

  }
}

init();
