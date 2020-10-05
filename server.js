const mysql = require ('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',
    password: '!Chickens1994',

    database: 'employees_DB'

});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
    .prompt({
      name: "userChoice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "exit"
      ]
    }).then(function(answer) {
        if (answer === 'View departments') {
            viewDepartments();
        } else if (answer === 'View roles') {
            viewRoles();
        } else if (answer === 'View employees') {
            viewEmployees();
        } else {
            connection.end();
        }
    });
}

function viewEmployees() {
    const query = 'SELECT * FROM '
}