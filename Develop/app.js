const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, `team.html`);

const render = require("./lib/htmlRenderer");

const employees = [];

var teamName = ""

function startBuild() {
    //welcome and prompt for team name
    const questions = [
        {
            type: 'input',
            name: 'teamName',
            message: 'please enter your team or division name',
            validate: function (value) {
                if (value === '') {
                    return 'please enter a name';
                } else {
                    return true;
                };
            },
        },
    ]
    inquirer.prompt(questions).then(answers => {
        console.log('\n')
        teamName = answers.teamName
        console.log(teamName)
        chooseType();
    });
};

function chooseType() {
    // what type of employee will you be adding?
    const questions = [
        {
            type: 'list',
            name: 'type',
            message: 'What type of employee do you want to add?',
            choices: ['Manager', 'Engineer', 'Intern']
        },
    ]
    // Run the employee build type based on response
    inquirer.prompt(questions).then(answers => {
        if(answers.type === 'Manager'){
            console.log("Adding a manager...")
            addManager();
        }else if(answers.type === 'Engineer'){
            console.log("Adding an engineer...")
            addEngineer();
        }else{
            console.log("Adding an intern...")
            addIntern();
        }
    });
};

function addEngineer() {
    // prompt for needed information
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: `Engineer's Name: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter a name';
                } else {
                    return true;
                };
            },
        },
        {
            type: 'input',
            name: 'id',
            message: `Engineer's id: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter an id';
                } else {
                    return true;
                };
            },
        },
        {
            type: 'input',
            name: 'email',
            message: `Engineer's email: `,
            validate: function(value) {
                var pass = value.match(
                  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
                );
                if (pass) {
                  return true;
                };
          
                return 'Please enter a valid email address';
            }
        },
        {
            type: 'input',
            name: 'github',
            message: `Engineer's github: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter a github id';
                } else {
                    return true;
                };
            },
        },
    ]
    inquirer.prompt(questions).then(answers => {
        const engi = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // console.log(engi);
        employees.push(engi);
        console.log(`${engi.name} has been added as an engineer.`);
        loopPrompt();
    });
    // create engineer and push to employee array
    // ask if there are more employees to add
    //chooseType if yes - start render if no
};

function addManager() {
    // prompt for needed information
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: `Manager's Name: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter a name';
                } else {
                    return true;
                };
            },
        },
        {
            type: 'input',
            name: 'id',
            message: `Manager's id: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter an id';
                } else {
                    return true;
                };
            },
        },
        {
            type: 'input',
            name: 'email',
            message: `Manager's email: `,
            validate: function(value) {
                var pass = value.match(
                  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
                );
                if (pass) {
                  return true;
                };
          
                return 'Please enter a valid email address';
            }
        },
        {
            type: 'input',
            name: 'phone',
            message: `Manager's office phone number: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter a phone number';
                } else {
                    return true;
                };
            },
        },
    ]
    inquirer.prompt(questions).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.phone);
        // console.log(manager);
        employees.push(manager);
        console.log(`${manager.name} has been added as a manager.`);
        loopPrompt();
    });
    // create manager and push to employee array
    // ask if there are more employees to add
    //chooseType if yes - start render if no
};

function addIntern() {
    // prompt for needed information
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: `Intern's Name: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter a name';
                } else {
                    return true;
                };
            },
        },
        {
            type: 'input',
            name: 'id',
            message: `Intern's id: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter an id';
                } else {
                    return true;
                };
            },
        },
        {
            type: 'input',
            name: 'email',
            message: `Intern's email: `,
            validate: function(value) {
                var pass = value.match(
                  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
                );
                if (pass) {
                  return true;
                };
          
                return 'Please enter a valid email address';
            }
        },
        {
            type: 'input',
            name: 'school',
            message: `Intern's School: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter a school name';
                } else {
                    return true;
                };
            },
        },
    ]
    inquirer.prompt(questions).then(answers => {
        const intern = new Intern (answers.name, answers.id, answers.email, answers.school);
        // console.log(intern);
        employees.push(intern);
        console.log(`${intern .name} has been added as an intern.`);
        loopPrompt();
    });
    // create intern and push to employee array
    // ask if there are more employees to add
    //chooseType if yes - start render if no
};


function loopPrompt(){
    // ask if they have anyone else to add
    const questions = [
        {
            type: 'list',
            name: 'loop',
            message: `Do you have any more employees to add?`,
            choices: ['yes', 'no']
        },
    ]
    //either cycle back to chooseType or start render
    inquirer.prompt(questions).then(answers => {
        // console.log(employees)
        if(answers.loop === 'yes'){
            chooseType();
        }else{
            startRender();
        };
    });
}

function startRender() {
    const questions = [
        {
            type: 'list',
            name: 'check',
            message: `is this everyone?`,
            choices: ['yes', 'no']
        },
    ];
    // ask if list of employees is everyone
    console.log(`\n`)
    console.log(`${employees.map(function (key) {
        return key.name + " - " + key.getRole() + "\n"       
    }).join("")}`)
    //if no chooseType if yes render
    inquirer.prompt(questions).then(answers => {
        // console.log(employees)
        if(answers.check === 'yes'){
            // write file to output
            fs.writeFile(outputPath, render(employees), function (err) {
                if (err) throw err;
                console.log(`Saved to team.html`);
              });
        }else{
            chooseType();
        };
    });
};


startBuild();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
