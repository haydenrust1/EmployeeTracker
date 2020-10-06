const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',
    password: '!Chickens1994',

    database: 'employees_DB'

});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`
================================================================
===      ______                 _                            ===
===     |   __/ _ __ ___  _ __ | | ___  _   _  ___  ___      ===
===     |   _| |  _ '  _ \\  _ \\| |/ _ \\| | | |/ _ \\/ _ \\     ===
===     |  |___  | | | | | |_) | | (_) | |_| |  __/  __/     ===
===     |______|_| |_| |_|  __/|_|\\___/\\___, |\\___|\\___|     ===
===                      |__|           |___/                ===
===                                                          ===
===      __  __                                              ===
===     |  \\/  | __ _ _ __   __ _  __ _  ___ _ __            ===
===     | |\\/| |/ _' | '_ \\ / _' |/ _' |/ _ \\ '__|   (\\_/)   ===
===     | |  | | (_| | | | | (_| | (_| |  __/ |      (O.o)   ===
===     |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|      (> <)   ===
===                               |___/                      ===
================================================================
	`);
    start();
});

function start() {
    inquirer
        .prompt({
            name: "userChoice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View departments, roles, and employees",
                "Add departments, roles, or employees",
                "Update employees role",
                "exit"
            ]
        })
        .then(function (answer) {
            console.log(answer.userChoice);
            if (answer.userChoice === 'View departments, roles, and employees') {
                view();
            } else if (answer.userChoice === 'Add departments, roles, or employees') {
                add();
            } else if (answer.userChoice === 'Update employees role') {
                updateRole();
            } else {
                console.log('Goodbye!');
                connection.end();
            }
        });
}

function view() {
    inquirer
        .prompt({
            name: 'viewChoice',
            type: 'list',
            message: 'What would you like to view?',
            choices: [
                "View departments",
                "View roles",
                "View employees",
                "main menu"
            ]
        })
        .then(function (answer) {
            if (answer.viewChoice === 'View departments') {
                const query = 'SELECT * FROM department';
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    view();
                });
            } else if (answer.viewChoice === 'View roles') {
                const query = 'SELECT * FROM job';
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    view();
                });
            } else if (answer.viewChoice === 'View employees') {
                const query = 'SELECT * FROM employee';
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    view();
                });
            } else {
                start();
            }

        })
}

function add() {
    inquirer
        .prompt({
            name: 'addChoice',
            type: 'list',
            message: 'What would you like to add?',
            choices: [
                "Add departments",
                "Add roles",
                "Add employees",
                "main menu"
            ]
        })
        .then(function (answer) {
            if (answer.addChoice === 'Add departments') {
                addDepartment();
            } else if (answer.addChoice === 'Add roles') {
                addRole();
            } else if (answer.addChoice === 'Add employees') {
                addEmployee();
            } else {
                start();
            }

        })
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'addChoice',
            type: 'input',
            message: 'What department would you like to add?'
        })
        .then(function (answer) {
            const query = 'INSERT INTO department (name) VALUES (?)';
            connection.query(query, [answer.addChoice], function (err, res) {
                if (err) throw err;
                console.log('Department added!');
                view();
            });
        });
}

function addRole() {
    inquirer
        .prompt({
            name: 'roleName',
            type: 'input',
            message: 'What role would you like to add?'
        },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'What is the salary of this position(leave out commas)'
            })
        .then(function (answer) {
            const query = 'INSERT INTO job (title, salary, department_id) VALUES (?)';
            const values = [[answer.roleName, 100000, 'SELECT id FROM department where name = "Sales"']];
            connection.query(query, [values], function (err, res) {
                if (err) throw err;
                console.table('Role added!');
                view();
            });
        });
}

function addEmployee() {
    inquirer
        .prompt({
            name: 'employeeFirst',
            type: 'input',
            message: 'What is the first name of this employee?'
        },
            {
                name: 'employeeLast',
                type: 'input',
                message: 'What is the last name of this employee?'
            })
        .then(function (answer) {
            const query = 'INSERT INTO employee (first_name, last_name, job_id) VALUES (?)';
            const values = [answer.employeeFirst, answer.employeeLast, 'SELECT id FROM job where title = "Sales Lead"']
            connection.query(query, [values], function (err, res) {
                if (err) throw err;
                console.log('employee added!');
                view();
            });

        })
}

function updateRole() {
    let employees = [];
    connection.query('Select first_name, last_name FROM employee', function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            employees.push(`${res[i].first_name} ${res[i].last_name}`);
        }
        return employees;
    })

    inquirer
        .prompt({
            name: 'updateChoice',
            type: 'list',
            message: 'What employee would you like to update?',
            choices: employees
        })
        .then(function (answer) {
            console.log('updated!');
        })
}