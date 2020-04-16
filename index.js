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
function generateReadMe(answers) {
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
  return `
  # project-title \n


`;
}

async function init() {

  try {
    const answers = await promptUser();
    const queryRepoUrl = `https://api.github.com/repos/${answers.githubUsername}/${answers.githubRepo}`;
    console.log(queryRepoUrl);
    
    let response = await axios.get(queryRepoUrl);
    const githubRepoData = response.data;
    console.log(githubRepoData);

    const forks = githubRepoData.forks;
    console.log(forks);

  } catch(err) {
    console.error(err.response.statusText);

  }
}

init();
