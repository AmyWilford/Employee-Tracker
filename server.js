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

//THEN I am prompted to enter the employee’s first name, 
// last name, role, and manager, and that employee is added 
// to the database
let addEmployee = () =>{
    inquirer.prompt ([
        {
        type: 'input', 
        message: 'Enter Employee First Name',
        name: 'firstname',
        validate: function(name) {
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
        validate: function(name) {
            if (!firstname){
                console.log('Please enter a last name')
                return false;
            }
            return true;
        }
    },
    {
        type: 'choices', 
        message: 'What is the employees role?',
        name: 'employee-role',
        choices: ['Slayer', 'Watcher', 'Reearcher', 'Maintenance', 'Demon Consultant']
    },
    {
        type: 'choices', 
        message: 'Select employee manager. Select none if no manager',
        name: 'employee-manager',
        choices: ['Buffy Summers', 'Rupert Giles', 'Willow Rosenberg', 'Zander Harris', 'Anya Jenkins']
    }        
    ])
    .then()
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

//THEN I am prompted to enter the name, salary, and department for the 
// role and that role is added to the database
let  addRole = () =>{
    let departmentsArray =[];
    let SQLquerydepartment = `SELECT * FROM department`;

    db.query(SQLquerydepartment, (err,res) =>{
        if (err) throw err;
       res.forEach(department => {
        let departmentObject = {
            name: department.name, 
            id: department.id
        }
        departmentsArray.push(departmentObject)
       })
       console.log(departmentsArray)

    })

    // inquirer.prompt [(
    //     {
    //         type: 'input', 
    //         message: 'Enter New Role title',
    //         name: 'roleTitle',
    //         validate: function(roleTitle) {
    //             if (!roleTitle){
    //                 console.log('Please enter a role title')
    //                 return false;
    //             }
    //             return true;
    //         }
    //     },
    //     {
    //         type: 'number',
    //         message: 'Enter role salary', 
    //         name: 'roleSalary', 
    //         validate: function(roleSalary){
    //             if (!roleSalary){
    //                 console.log('Please enter a numeric salary')
    //                 return false;
    //             }
    //             return true;
    //         }
    //     },
    //     {
    //         type: 'input', 
    //         message: 'Enter New Role title',
    //         name: 'roleTitle',
    //         choices:[]
    //     }
    // )]



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
        let SQLquery = `INSERT INTO department (name) VALUES (?)`;
        let value = response.deptName
        db.query(SQLquery, value, (err, res)=>{
            if (err) throw err;
            console.log(`Successfully inserted ${response.deptName} into database.`)
            promptQuestions();
        })
    })
};

// viewEmployeeManager = () =>{

// }

// updateEmployeeManager = () => {

// };

// viewEmployeeDepartment = () => {

// };

// removeDepartment = () =>{

// };

// removeRole = () => {

// }

// removeEmployee = () => {

// }

// viewDepartmentBudget = () => {

// };