const fs = require('fs');
const inquirer = require('inquirer')
const generatePage = require('./src/page-template')

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('Enter your name!');
                return false;
            }
        }
      },

      {
        type:'input',
        name: 'github',
        message: 'Enter your Github username',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('enter a project name!');
                return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you  like to enter some information aobut yourself for an about section',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({confirmAbout}) => confirmAbout
      }
    ]);
  };
  
  

const promptProject = portfoliodata => {
    
    console.log(`
  =================
  Add a New Project
  =================
  `);

  if (!portfoliodata.projects) {
    portfoliodata.projects = [];
}
    return inquirer.
    prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('enter a project name!');
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log('enter a project description!');
                return false;
            }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
      .then(projectData => {
        portfoliodata.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfoliodata);
        } else {
          return portfoliodata;
        }
      });
  };

  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });
  




//const fs = require('fs');

//const generatePage = require('./src/page-template');

//const pageHTML = generatePage(name, github);

//fs.writeFile('./index.html', pageHTML, err => {
//  if (err) throw err;

//  console.log('Portfolio complete! Check out index.html to see the output!');
// });