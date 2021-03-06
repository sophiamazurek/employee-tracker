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


inquirer.prompt({
    type: "input",
    name:"departmentName",
    message:"What is the department name?"
}).then(function(response)
{
    console.log('INSERT INTO department (name) VALUES ("'+response.departmentName+'");')
    connection.query('INSERT INTO department (name) VALUES ("'+response.departmentName+'");', function(err, res) {
        if (err) throw err;
        console.log("Deparment table data inserted!");
        console.table(res);
        wannaKeepGoing();
      });

})
    
  
  };


selectAllDepartment = () => {
  connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    console.log("selecting Departments");
    console.table(res);
    wannaKeepGoing();
  });

};

selectAllEmployeeRole = () => {
    console.clear();
    connection.query('SELECT * FROM employeerole', function(err, res) {
      if (err) throw err;
      console.log("selecting employee roles");
      console.table(res);
      wannaKeepGoing();
    });

  };

selectAllEmployee = () => {
    console.clear();
    connection.query('SELECT * FROM employee', function(err, res) {
      if (err) throw err;
      console.log("Selecting Employees");
      console.table(res);
      console.log('\n')
      wannaKeepGoing();
    });

  };

addRole = () =>{
    let questions = [
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
            name:"department_id",
            message:"What is the department id number?"
        }
    ];

    inquirer.prompt(questions)
    .then(function(answer){
        console.log('INSERT INTO employeerole (title, salary, department_id) VALUES ("'+answer.roleName+'","'+answer.salary+'","'+answer.department_id+'");')

        connection.query('INSERT INTO employeerole (title, salary, department_id) VALUES ("'+answer.roleName+'","'+answer.salary+'","'+answer.department_id+'");', function(err, res) {
        if (err) throw err;
        console.log("Deparment table data inserted!");
        console.table(res);
        wannaKeepGoing();
      });
    });
};

addEmployee = () =>{
    //query db for avaialbe roles --> ['Manager', 'Intern', 'IT']
    // that array is called roleOptions
    inquirer.prompt([
        {
            type: "input",
            name:"first_name",
            message:"What is your first name?"
        },
        {
            type:"input",
            name:"last_name",
            message:"What is your last name?"
        },
        {
            type: "input",
            name:"role_id",
            message:"What is your role id?"
        }
    ])
    .then(function(answer){
        console.log('INSERT INTO employee (first_name, last_name, role_id) VALUES ("'+answer.first_name+'","'+answer.last_name+'","'+answer.role_id+'");')

        connection.query('INSERT INTO employee (first_name, last_name, role_id) VALUES ("'+answer.first_name+'","'+answer.last_name+'","'+answer.role_id+'");'),
        [answer.first_name, answer.last_name, answer.role_id],
        function(err, answer){
            if (err) throw err;
            wannaKeepGoing();
        };
    });
};

updateEmployeeRole = () =>{
    inquirer.prompt([
        {
            type: "input",
            name:"id",
            message:"What is your id?"
        },
        {
            type:"input",
            name:"title",
            message:"What is your title?"
        },
        {
            type: "input",
            name:"salary",
            message:"Please updated your salary using only numbers and no special characters."
        },
        {
            type: "input",
            name:"department_id",
            message:"Please choose a pre-exisiting department id."
        }
    ])
    .then(function(answer){
        //UPDATE emoloyeerole SET column1 = value1, column2 = value2, ... WHERE condition;
        
        const query = connection.query(
            'UPDATE employeerole SET ? WHERE ?',
            [
              {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
              },
              {
                id: answer.id
              }
            ],

            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + ' products updated!\n');
              wannaKeepGoing();
            }
          );
       
       
    });
};

wannaKeepGoing = () => {
    inquirer.prompt([{
        type: 'confirm',
        name: 'quit',
        message: 'Would you like to keep going?'
    }]).then(userResponse => {
        if (userResponse.quit) {
            start()
        } else {
            console.log('Have a great day!')
            process.exit()
        }
    })
}
