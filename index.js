const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    // Get readme details of new repository from user
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
      name: "email",
      message: "Enter contact email where questions can be sent?"
    },
  ]);
}

async function generateReadMe() {

  try {
    // Get Answers from User prompts
    const answers = await promptUser();

    //Github API request
    const queryRepoUrl = `https://api.github.com/repos/${answers.githubUsername}/${answers.githubRepo}`;
    console.log(queryRepoUrl);
    const response = await axios.get(queryRepoUrl);
    const githubRepoData = response.data;
 
    // Badge Data: Updated at
    let updatedAt = new Date (githubRepoData.updated_at);
    updatedAt = updatedAt.getDate()+'-' + (updatedAt.getMonth()+1) + '-'+updatedAt.getFullYear();
    console.log(updatedAt);
    const updatedBadgeUrl = `https://img.shields.io/static/v1?label=Updated%20at&message=${updatedAt}&color=yellow&?style=social&logo=github`
    console.log(updatedBadgeUrl);
    
    // Badge Data: Forks
    const forks = githubRepoData.forks;
    const forksBadgeUrl = `https://img.shields.io/static/v1?label=Forks&message=${forks}&color=green&?style=social&logo=github`
    console.log(forksBadgeUrl);
    
    // Badge Data: Stars
    const stars = githubRepoData.stargazers_count;
    const starsBadgeUrl = `https://img.shields.io/static/v1?label=stars&message=${stars}&color=blue&?style=social&logo=github`
    console.log(starsBadgeUrl);

    // Badge Data: Issues
    const openIssues = githubRepoData.open_issues;
    const openIssuesBadgeUrl = `https://img.shields.io/static/v1?label=open%20issues&message=${openIssues}&color=orange&?style=social&logo=github`
    console.log(openIssuesBadgeUrl);
    
    // Get user data from Github API
    const profPicUrl = githubRepoData.owner.avatar_url;
    const githubUrl = githubRepoData.owner.url;
    
    // Generate readme content data
    let readMeData = 
`
# ${answers.projectTitle} ![Github Update](${updatedBadgeUrl}) ![Github Forks](${forksBadgeUrl}) ![Github Forks](${starsBadgeUrl}) ![Github Forks](${openIssuesBadgeUrl})

## Description
${answers.decription}

---
##Table of Contents  
​
 * [Installation](#installation)
 * [Usage](#usage)
 * [Licence](#licence)
 * [Contributing](#contributing)
 * [Tests](#tests)
 * [Questions](#questions) 

---
## Installation
${answers.installation}

## Usage
${answers.usage}

## Licence
${answers.licence}

## Contribution
${answers.contribution}

## Tests
${answers.tests}

---
## Have any questions?
![Github profile picture](${profPicUrl})
* [Github Link](${githubUrl})
* [Email](${answers.email})
`;

    //Write to new readme file
    writeFileAsync ('MyReadME.md', readMeData, (err) => {
    if (err) throw err;
    });
    console.log ("Successfully created 'MyReadME.md' file");  
    //Handle rejected promise
  } catch(err) {
    console.error(err.message);
  }
}

generateReadMe();
