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

let employees = [];
let id = 0;

promptEmployee()


function promptEmployee() {
    inquirer.prompt([
        // ALL EMPLOYEES PROMPT SECTION
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
            validate: validateName
        },

        {
            type: "input",
            message: "What is the email of the employee?",
            name: "employeeEmail",
            validate: validateMail
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
        // RESTART PROMPT
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "addMoreEmployee",
        },
    ]).then((response) => {
        // CREATION OF EMPLOYEE DEPENDING ON ROLE
        if (response.role === "Manager") {
            newEmployee = new Manager(response.employeeName, id, response.employeeEmail, response.managerOfficeNumber)
        }
        else if (response.role === "Intern") {
            newEmployee = new Intern(response.employeeName, id, response.employeeEmail, response.internSchool)
        }
        else if (response.role === "Engineer") {
            newEmployee = new Engineer(response.employeeName, id, response.employeeEmail, response.engineerGithub)
        }
        // INCREMENT ID
        id++
        // PUSH EMPLOYEE TO ARRAY
        employees.push(newEmployee)
        // OPTION TO RESTART PROMPT
        if (response.addMoreEmployee) { promptEmployee() }
    })
        .then(() => {
            fs.writeFile(outputPath, render(employees),
                function (error) { if (error) { return console.log(error) } });
        })
        .then(() => console.log("file saved"))
        .catch((e) => console.log(e))
}

function validateName(name) {
    if (!name.includes(" ")) {
        return "You have to input first and last name"
    }
    else {
        return true
    }
}

function validateMail(name) {
    if (!name.includes("@") || !name.includes(".")) {
        return "You have to input an email address, such as engineer@template.com"
    }
    else {
        return true
    }
}