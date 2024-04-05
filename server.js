const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Password2@",
        database: "employees_db",
    },
    console.log(`Connected to the employees_db database.`)
);

function startingQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'intro',
            message: 'What would you like to do?',
            choices:[
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }
    ]).then((answer) => {
        switch(answer.intro) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                console.log('Good-Bye!');
                db.end();
                break;
        }
    });
};