const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');

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
                'View Total Utilized Department Budget'
,             ]
        }
    ])
    .then((answers)=>{
        const {choices} = answers;
        if (choices === 'View All Employees'){
            // viewAllEmployees();
        }
        if (choices === 'Add Employee') {
            // addEmployee();
        }
        if (choices === 'View All Roles') {
            // viewAllRoles();
        }
        if (choices === 'Update Employee Role') {
            // updateEmployeeRole()
;        }
        if (choices === 'Add Role') {
            // addRole();
        }
        if (choices === 'View All Departments') {
            // viewAllDepartments();
        }
        if (choices === 'Add Department') {
            // addDepartment();
        }
        if (choices === 'View Employees by Manager') {
            // viewEmployeeManager();
        }
        if (choices === 'Update Employee Managers') {
            // updateEmployeeManager();
        }
        if (choices === 'View Employees by Department') {
            // viewEmployeeDepartment();
        }
        if (choices === 'Remove Department') {
            // removeDepartment();
        }
        if (choices === 'Remove Role') {
            // removeRole();
        }
        if (choices === 'Remove Employee') {
            // removeEmployee();
        }
        if (choices === 'View Total Utilized Department Budget') {
            // viewDepartmentBudget();
        }

    });
};

// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
let viewAllEmployees = ()=>{
    const SQLquery = 

};

//THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
let addEmployee = () =>{

};

//THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
let updateEmployeeRole = () =>{

};

// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
let viewAllRoles = () =>{

};

//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
let  addRole = () =>{

};

//THEN I am presented with a formatted table showing department names and department ids
let viewAllDepartments = () =>{


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