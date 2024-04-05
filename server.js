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

db.connect(function (err) {
    if (err) throw err;
    console.log(|--------------------------------------|);
    console.log(|           EMPLOYEE TRACKER           |);
    console.log(|--------------------------------------|);
    startingQuestion();
});

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

function viewDepartments() {
    const sql = `SELECT department.id, department.name AS Department FROM department;`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        startingQuestion();
    });
};

function viewRoles() {
    const sql = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        startingQuestion();
    });
};

function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        startingQuestion();
    });
};