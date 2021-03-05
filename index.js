const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'C98ohios!',
  database: 'employee_tracker_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  start();
});

const questions = [
    
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ['View all department', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', "Exit"]
    },
    // {
    //     type: 'input',
    //     name: 'githubusername',
    //     message: 'What is your GitHub username?'
    // }
  ];

function start() {
    //ask user for info (inquirer)
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View all department', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', "Exit"]
      }])
    .then(function(data) {
         if(data.action=='View all department'){
             selectAllDepartment();
         }
         if(data.action=='View all roles'){
            selectAllEmployeeRole();
        }
        if(data.action=='View all employees'){
            selectAllEmployee();
        }
        if(data.action=='Add department'){
            addDepartment();
        }
        if(data.action=='Add role'){
            addRole();
        }
        if(data.action=='Add employee'){
            addEmployee();
        }
        if(data.action=='Update employee role'){
            updateEmployeeRole();
        }
        if(data.action=='Exit'){
            Exit();
        }
      });


}

// Function call to initialize app

addDepartment= () => {
    //inqureier ask for id and name
    //INSERT INTO department (id, name)VALUES (1, "HR");
    connection.query('SELECT * FROM department', function(err, res) {
      if (err) throw err;
      console.log("Deparment table data inserted!");
      console.table(res);
    });
  
    start();
  };


selectAllDepartment = () => {
  connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    console.log("selecting Departments");
    console.table(res);
  });

  start();
};

selectAllEmployeeRole = () => {
    connection.query('SELECT * FROM employeerole', function(err, res) {
      if (err) throw err;
      console.log("selecting employee roles");
      console.table(res);
    });

    start();
  };

selectAllEmployee = () => {
    connection.query('SELECT * FROM employee', function(err, res) {
      if (err) throw err;
      console.log("Selecting Employees");
      console.table(res);
    });

    start();
  };

addRole = () =>{
    inquirer.prompt([
        {
            type: "input",
            name:"roleName",
            message:"What is the name of your role?"
        },
        {
            type:"input",
            name:"salary",
            message:"Please enter with numbers only what is the salary of this role?"
        },
        {
            type: "input",
            name:"departmentid",
            message:"What is the department id number?"
        }
    ])
    .then(function(answer){
        connection.query("INSERT INTO employeerole"),
        [answer.roleName, answer.salary, answer.departmentid],
        function(err, answer){
            if (err) throw err;
            start();
        };
    });
};
