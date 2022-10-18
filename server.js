const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');

let values = [
    ['this', 20], 
    ['that', 30]
];
console.table(values);

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
    promptQuestions();
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
            // addEmployee();
        }
        if (answer === 'View All Roles') {
            viewAllRoles();
        }
        if (answer === 'Update Employee Role') {
            // updateEmployeeRole()
;        }
        if (answer === 'Add Role') {
            // addRole();
        }
        if (answer === 'View All Departments') {
            viewAllDepartments();
        }
        if (answer === 'Add Department') {
            // addDepartment();
        }
        if (answer === 'View Employees by Manager') {
            // viewEmployeeManager();
        }
        if (answer === 'Update Employee Managers') {
            // updateEmployeeManager();
        }
        if (answer === 'View Employees by Department') {
            // viewEmployeeDepartment();
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

//THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
let addEmployee = () =>{

};

//THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
let updateEmployeeRole = () =>{

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

//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
let  addRole = () =>{

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

};

viewEmployeeManager = () =>{

}

updateEmployeeManager = () => {

};

viewEmployeeDepartment = () => {

};

removeDepartment = () =>{

};

removeRole = () => {

}

removeEmployee = () => {

}

viewDepartmentBudget = () => {

};