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
      name: "email",
      message: "Enter contact email where questions can be sent?"
    },
  ]);
}
// To DO Section below to be updated from HTML to MarkDown 
async function generateReadMe() {
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

// let readMeData = `
// # ${answers.projectTitle}
// [![Github Update](${updatedBadgeUrl})]
// [![Github Forks](${forksBadgeUrl})]

// ## Decription
// ${answers.decription}

// ## Installation
// ${answers.installation}
// ## Usage
// ${answers.usage}

// ## Licence
// ${answers.licence}

// ## Contribution
// ${answers.contribution}

// ## Tests
// ${answers.tests}

// ## Have any questions?
// ![Github profile picture](${profPicUrl})
// [Github Link](${githubUrl})
// [Email](${email})
// `;
// writeFileAsync ('MyReadME.md', readMeData,(err, data => {
// if (err) throw err;
// console.log ("Successfully created readme file");  
// }))

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
    const updatedBadgeUrl = `https://img.shields.io/static/v1?label=Updated%20at&message=${updatedAt}&color=blue&?style=social&logo=github`
    console.log(updatedBadgeUrl);
    
    const forks = githubRepoData.forks;
    const forksBadgeUrl = `https://img.shields.io/static/v1?label=Forks&message=${forks}&color=green&?style=social&logo=github`
    console.log(forksBadgeUrl);
    
    
    const profPicUrl = githubRepoData.owner.avatar_url;
    const githubUrl = githubRepoData.owner.url;
    const email = githubRepoData.email;
    
    // Generate readme content data

    let readMeData = 
`
# ${answers.projectTitle} - ${answers.githubRepo}
![Github Update](${updatedBadgeUrl})
![Github Forks](${forksBadgeUrl})

## Description
${answers.decription}

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

## Have any questions?
![Github profile picture](${profPicUrl})
* [Github Link](${githubUrl})
* [Email](${email})
`;
    //Write to new readme file
    writeFileAsync ('MyReadME.md', readMeData, (err) => {
    if (err) throw err;
    console.log ("Successfully created readme file");  
    });

  } catch(err) {
    console.error(err);

  }
}

init();
