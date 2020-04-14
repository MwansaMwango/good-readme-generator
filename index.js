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
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "githubRepo",
      message: "What is your project's Github repository?"
    },
    // To Do add other questions regarding project information
    // { 
    //   type: "input",
    //   name: "description",
    //   message: "What is your project's description?"
    // },
    // {
    //   type: "input",
    //   name: "installation",
    //   message: "How does a user install the project?"
    // },

  ]);
}
// To DO Section below to be updated from HTML to MarkDown 
function generateReadMe(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.githubUsername}</h1>
    <p class="lead">I am from ${answers.githubRepo}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();
    const queryUrl = `https://api.github.com/repos/${answers.githubUsername}/${answers.githubRepo}`;
    console.log(queryUrl);
    
    const response = await axios.get(queryUrl);
    const githubRepoData = response.data;
    console.log(githubRepoData);

    const forks = githubRepoData.forks;
    console.log(forks);

  } catch(err) {
    console.log(err);
  }
}

init();
