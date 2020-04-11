const fs = require ('fs').promises;
const inquirer = require ('inquirer');

inquirer
    .prompt ([
        {
            type:'input',
            name: 'name',
            message: 'What is your name?',
        },
        {
            type:'input',
            name: 'location',
            message: 'What suburb do you live in?',
        },
        {
            type:'input',
            name: 'bio',
            message: 'Tell us about yourself?',
        },
        {
            type:'input',
            name: 'linkedin',
            message: 'What is your linkedIn URL?',
        },
        {
            type:'input',
            name: 'github',
            message: 'What is your github URL?',
        }
     ])
        .then(({name, location, bio, linkedin, github }) => {
            const profileHTML = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${name}</title>
                </head>
                <body>
                    <h2>${name}</h2>
                    <h3>Location: ${location}</h3>
                    <p>${bio}</p>
                    <p>LinkedIn: ${linkedin}</p>
                    <p>GitHub: ${github}</p>
                </body>
            </html>`;
           return fs.writeFile('output.html', profileHTML);
        
        }).then (
            console.log('File Written!')
        )
          .catch(error => {
            if(error.isTtyError) {
              // Prompt couldn't be rendered in the current environment
            } else {
              console.error(error)
            }
         });
