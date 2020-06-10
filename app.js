const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let managers = [];
let employees = [];
let engineers = [];
let interns = [];
let id = 0;

promptEmployee()


function promptEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "What kind of member would you like to add to the team?",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ]
        },
        {
            type: "input",
            message: "What is the name of your employee?",
            name: "employeeName",
        },
        {
            type: "input",
            message: "What is the email of the employee?",
            name: "employeeEmail",
        },
        // MANAGER SECTION PROMPT
        {
            type: "input",
            message: "What is the office number of the team manager?",
            name: "managerOfficeNumber",
            when: (answers) => answers.role === "Manager",
        },
        // INTERN SECTION PROMPT
        {
            type: "input",
            message: "Can you add a school for your Intern?",
            name: "internSchool",
            when: (answers) => answers.role === "Intern",
        },
        // ENGINEER SECTION PROMPT
        {
            type: "input",
            message: "Can you add the github account for your Engineer?",
            name: "engineerGithub",
            when: (answers) => answers.role === "Engineer",
        },
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "addMoreEmployee",
        },
    ]).then((response) => {
        const newEmployee = new Employee(response.employeeName, id, response.employeeEmail)

        if (response.role === "Manager") {
            newManager = new Manager(id, response.employeeName, response.employeeEmail, response.managerOfficeNumber)
        }
        if (response.role === "Intern") {
            newIntern = new Intern(id, response.employeeName, response.employeeEmail, response.internSchool)
        }
        if (response.role === "Engineer") {
            newIntern = new Intern(id, response.employeeName, response.employeeEmail, response.engineerGithub)
        }
        id++
        employees.push(newEmployee)
        render(employees)
        if (response.addMoreEmployee) { promptEmployee() }
    })
        .catch((e) => console.log(e))
}




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
// for the provided `render` function to work!```
