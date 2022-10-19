const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');
const { title } = require('process'); //<this just appeared....
const figlet = require('figlet');

const db = mysql.createConnection(
    {
        host: 'localhost', 
        user: 'root', 
        password: 'SQLroot.', 
        database: 'employee_db'
    },
    console.log('Connected to employee_db')
);

db.connect(err => {
    if(err) throw err;
    figlet('\nScooby Gang: \n Team Tracker\n', function(err, data) {
        if (err) {
            console.log ('Something went wrong...');
            console.dir(err);
            return
        }
        console.log(data);
        promptQuestions();
    })
})

const promptQuestions = () => {
    inquirer.prompt([
        {
            type: 'list', 
            message: 'What would you like to do?',
            name: 'options',
            choices: [
                'View All Employees', 
                'Add Employee', 
                'View All Roles', 
                'Update Employee Role', 
                'Add Role', 
                'View All Departments',
                'Add Department',
                'Update Employee Managers', 
                'View Employees by Manager', 
                'View Employees by Department', 
                'Delete Departments, Roles, & Employees',
                'View Total Utilized Department Budget',
                'Exit'
,             ]
        }
    ])
    .then(function (response){
        const answer = response.options;

        if (answer === 'View All Employees'){
            viewAllEmployees();
        }
        if (answer === 'Add Employee') {
            addEmployee();
        }
        if (answer === 'View All Roles') {
            viewAllRoles();
        }
        if (answer === 'Update Employee Role') {
            updateEmployeeRole()
;        }
        if (answer === 'Add Role') {
            addRole();
        }
        if (answer === 'View All Departments') {
            viewAllDepartments();
        }
        if (answer === 'Add Department') {
            addDepartment();
        }
        // BONUS - OPTIONAL
        if (answer === 'View Employees by Manager') {
            // viewManagerEmployees();
        }
        if (answer === 'Update Employee Managers') {
            // updateEmployeeManager();
        }
        if (answer === 'View Employees by Department') {
            viewEmployeeDepartment();
        }
        if (answer === 'Remove Department') {
            // removeDepartment();
        }
        if (answer === 'Remove Role') {
            // removeRole();
        }
        if (answer === 'Remove Employee') {
            // removeEmployee();
        }
        if (answer === 'View Total Utilized Department Budget') {
            // viewDepartmentBudget();
        }

    });
};

// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
let viewAllEmployees = ()=>{
    const SQLquery = 
    `
    SELECT e.id AS 'Employee ID', 
    e.first_name AS 'First Name', 
    e.last_name AS 'Last Name', 
    role.title AS 'Role', 
    department.name AS 'Department', 
    role.salary AS 'Salary', 
    CONCAT(m.first_name, " ", m.last_name) AS 'Manager'
    FROM employee AS e
    LEFT JOIN employee as m ON e.manager_id = m.id 
    JOIN role
    ON e.role_id = role.id
    JOIN department
    ON department_id = department.id
    ORDER BY e.id;
    `;

    db.query(SQLquery, (err, res) => {
        if (err) throw err;
        console.log('ALL EMPLOYEES \n');
        console.table(res);
        promptQuestions();
    });
};

//THEN I am prompted to enter the employee’s first name, 
// last name, role, and manager, and that employee is added 
// to the database
let addEmployee = () =>{

    // Get all employees to make choice of employee manager
    db.query(`Select * FROM employee`, (err, res) =>{
        if (err) throw err;
        let managerOptions = [];
        // loop through results of all employees and pull in firstname, lastname, and id > push inforamtion into array of manager options
        res.forEach(({first_name, last_name, id}) =>{
            managerOptions.push ( {
                name: first_name + ' ' + last_name, 
                value: id
            })
        })
        console.log(managerOptions);

        // Get all roles to make choice for employee role
        let roleOptions = [];
        db.query(`Select * FROM role`, (err, res) => {
            if (err) throw err;
            res.forEach(({title, id})=>{
                roleOptions.push({
                    name: title, 
                    value: id
                });
            })
            
        });
        inquirer.prompt ([
            {
            type: 'input', 
            message: 'Enter Employee First Name',
            name: 'firstname',
            validate: function(firstname) {
                if (!firstname){
                    console.log('Please enter a first name')
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input', 
            message: 'Enter Employee Last Name',
            name: 'lastname',
            validate: function(lastname) {
                if (!lastname){
                    console.log('Please enter a last name')
                    return false;
                }
                return true;
            }
        },
        {
            type: 'list', 
            message: 'What is the employees role?',
            name: 'employeeRole',
            choices: roleOptions
        },
        {
            type: 'list', 
            message: 'Select employee manager. Select none if no manager',
            name: 'employeeManager',
            choices: managerOptions
        }        
        ])
        .then(response =>{
            const SQLquery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            db.query(SQLquery, [response.firstname, response.lastname, response.employeeRole, response.employeeManager], (err, res) =>{
                if (err) throw err;
                console.log(`\n Succesfully added ${response.firstname} ${response.lastname} to roster \n`)
                promptQuestions();
            });
        });
    });
  
};

//THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
let updateEmployeeRole = () =>{
    db.query(`SELECT * FROM employee`, (err, res)=>{
        if (err) throw err;
        let employeeOptions =[];
        res.forEach(({first_name, last_name, id})=>{
            employeeOptions.push({
                name: first_name + ' '+ last_name, 
                value: id
            });
        });
        console.log(employeeOptions);
    db.query(`SELECT * FROM role`, (err, res)=> {
        if (err) throw err;
        let roleOptions = [];
        res.forEach(({title, id})=>{
            roleOptions.push({
                name: title, 
                value: id
            });
        });
        console.log(roleOptions);

        inquirer.prompt([
            {
                type: 'list', 
                message: 'Which employee would you like to update?',
                name: 'employee',
                choices: employeeOptions
            },
            {
                type: 'list', 
                message: 'Specify the new role', 
                name: 'role', 
                choices: roleOptions
            }

        ])
        .then(response =>{
            const SQLquery = `UPDATE employee SET ? WHERE ?`;
            db.query(SQLquery, [response.role, response.employee], (err, res)=>{
                if(err) throw err;
                console.log(`\n Succefully updated ${response.employee}'s role. They are now listed as a ${response.role}\n`)
                promptQuestions();
            })
        })
    })
    })
};

// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
let viewAllRoles = () =>{
    const SQLquery = 
    `
    SELECT role.title AS 'Role', role.id AS 'Role ID', department.name AS 'Department', role.salary AS 'Salary'
    FROM role
    JOIN department
    ON role.department_id = department.id
    ORDER BY role.id;
    `;

    db.query(SQLquery, (err, res) => {
        if (err) throw err;
        console.log('ALL ROLES \n');
        console.table(res);
        promptQuestions();
    });
};

//THEN I am prompted to enter the name, salary, and department for the 
// role and that role is added to the database
let  addRole = () =>{
    let departments =[];
    db.query(`SELECT * FROM department`, (err,res) =>{
        if (err) throw err;

        res.forEach(department => {
            let departmentObject = {
                name: department.name, 
                value: department.id
            }
            departments.push(departmentObject)
           })

           inquirer.prompt ([
                {
                type: 'input', 
                message: 'Enter New Role title',
                name: 'roleTitle',
                validate: function(roleTitle) {
                    if (!roleTitle){
                        console.log('Please enter a role title')
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'number',
                message: 'Enter role salary', 
                name: 'roleSalary', 
                validate: function(roleSalary){
                    if (!roleSalary){
                        console.log('Please enter a numeric salary')
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'list', 
                message: 'Which department does this role fall into?',
                name: 'department',
                choices: departments
            }
           ])
           .then(response =>{
            const SQLquery = `INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`;
            db.query(SQLquery, [response.roleTitle, response.roleSalary, response.department], (err, res) =>{
                if (err) throw err;
                console.log(`Succesfully add ${response.roleTitle}`);
                promptQuestions();

            })
        })
    })
};

//THEN I am presented with a formatted table showing department names and department ids
let viewAllDepartments = () =>{
    const SQLquery = `
    SELECT id AS 'Department ID', name AS 'Department'
    FROM department
    ORDER BY department.id;
    `;

    db.query(SQLquery, (err, res) => {
        if (err) throw err;
        console.log('ALL DEPARTMENTS \n');
        console.table(res);
        promptQuestions();
    });


};

//THEN I am prompted to enter the name of the department and that department is added to the database
let addDepartment = () =>{
    inquirer.prompt ([
        {
        type: 'input', 
        message: 'Enter New Department Name',
        name: 'deptName',
        validate: function(deptName) {
            if (!deptName){
                console.log('Please enter a department name')
                return false;
            }
            return true;
        }
    }
    ])
    .then(response => {
        const SQLquery = `INSERT INTO department (name) VALUES (?)`;
        let value = response.deptName
        db.query(SQLquery, value, (err, res)=>{
            if (err) throw err;
            console.log(`Successfully inserted ${response.deptName} into database.`)
            promptQuestions();
        })
    })
};

// viewManagerEmployee = () =>{

// }

// updateEmployeeManager = () => {

// };

viewEmployeeDepartment = () => {
    const SQLquery = 
    `SELECT employee.last_name AS 'Last Name', 
        employee.first_name AS 'First Name', 
        department.name AS 'Department'
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        ORDER BY employee.last_name;
        `;
    db.query(SQLquery, (err, res)=>{
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        console.log(`\n`)
    })
};

// removeDepartment = () =>{

// };

// removeRole = () => {

// }

// removeEmployee = () => {

// }

// viewDepartmentBudget = () => {

// };