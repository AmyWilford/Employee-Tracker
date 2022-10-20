// Import required NPM packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const ctable = require("console.table");
const figlet = require("figlet");
const { NONAME } = require("dns");

// Establish database connection details
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "SQLroot.",
    database: "employee_db",
  },
  console.log("Connected to employee_db")
);

// Initial connection to database - launch figlet welcome message and launch userOptions()
db.connect((err) => {
  if (err) throw err;
  figlet("\nScooby Gang: \n Team Tracker\n", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    userOptions();
  });
});

// Function to launch initial inquirer prompts listing user options
const userOptions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: [
          "View All Employees",
          "View Employees by Manager",
          "View Employees by Department",
          "View All Departments",
          "View All Roles",
          "View Current Department Budget",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Remove Employee",
          "Remove Department",
          "Remove Role",
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      const answer = response.options;
        // Run related function based on userOptions() response
      if (answer === "View All Employees") {
        viewAllEmployees();
      }
      if (answer === "View Employees by Manager") {
        viewManagerEmployees();
      }
      if (answer === "View Employees by Department") {
        viewEmployeeDepartment();
      }
      if (answer === "View All Departments") {
        viewAllDepartments();
      }
      if (answer === "View All Roles") {
        viewAllRoles();
      }
      if (answer === "View Current Department Budget") {
        viewDepartmentBudget();
      }
      if (answer === "Add Employee") {
        addEmployee();
      }
      if (answer === "Add Department") {
        addDepartment();
      }
      if (answer === "Add Role") {
        addRole();
      }
      if (answer === "Update Employee Role") {
        updateEmployeeRole();
      }
      if (answer === "Remove Employee") {
        removeEmployee();
      }
      if (answer === "Remove Department") {
        removeDepartment();
      }
      if (answer === "Remove Role") {
        removeRole();
      }
      if (answer === "Quit") {
        quit();
      }
    });
};

// Function to view all Employees
let viewAllEmployees = () => {
  const SQLquery = `
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
    console.log("\nAll Employees: \n\n");
    console.table(res);
    userOptions();
  });
};

// Function to Add Employee to the database
let addEmployee = () => {
  // Get all employees to make choice of employee manager
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    let managerOptions = [{
        name: 'none', 
        value: 0
    }];
    // loop through results of all employees and push specified information into array of manager options
    res.forEach(({ first_name, last_name, id }) => {
      managerOptions.push({
        name: first_name + " " + last_name,
        value: id,
      });
    });

    // Get all roles to make choice for employee role
    let roleOptions = [];
    db.query(`Select * FROM role`, (err, res) => {
      if (err) throw err;
    // loop through results of roles and push specified information into role options array
      res.forEach(({ title, id }) => {
        roleOptions.push({
          name: title,
          value: id,
        });
      });
    });

    // Inquirer prompts to collect new employee information
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter New Employee First Name",
          name: "firstname",
          validate: function (firstname) {
            if (!firstname) {
              console.log("Please enter a first name");
              return false;
            }
            return true;
          },
        },
        {
          type: "input",
          message: "Enter New Employee Last Name",
          name: "lastname",
          validate: function (lastname) {
            if (!lastname) {
              console.log("Please enter a last name");
              return false;
            }
            return true;
          },
        },
        {
          type: "list",
          message: "What is the New Employee Role?",
          name: "employeeRole",
          choices: roleOptions,
        },
        {
          type: "list",
          message: "Select New Employee Manager. Select none if no manager",
          name: "employeeManager",
          choices: managerOptions,
        },
      ])
    //   Once prompts are asked - take response and run SQLquery with defined values in array created of response
      .then((response) => {
        const SQLquery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        db.query(
          SQLquery,
          [
            response.firstname,
            response.lastname,
            response.employeeRole,
            response.employeeManager,
          ],
          (err, res) => {
            if (err) throw err;
            console.log(
              `\n Succesfully added ${response.firstname} ${response.lastname} to roster \n`
            );
            // Run userOptions() to go back to initial list of database options
            userOptions();
          }
        );
      });
  });
};

// Function to update Employee Role
let updateEmployeeRole = () => {
    // Query to get list of all employees and push in to an array of employee options to be used as inquirer list choices
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    let employeeOptions = [];
    res.forEach(({ first_name, last_name, id }) => {
      employeeOptions.push({
        name: first_name + " " + last_name,
        value: id,
      });
    });
    // Query to get list of all roles and push in to an array of role options to be used as inquirer list choices
    db.query(`SELECT * FROM role`, (err, res) => {
      if (err) throw err;
      let roleOptions = [];
      res.forEach(({ title, id }) => {
        roleOptions.push({
          name: title,
          value: id,
        });
      });
    // Inquirer prompts to collect new employee information
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which Employee Would You Like To Update?",
            name: "employee",
            choices: employeeOptions,
          },
          {
            type: "list",
            message: "Specify The New Position",
            name: "role",
            choices: roleOptions,
          },
          {
            type: "list",
            message: "Specify The Manager for this Position",
            name: "manager",
            choices: employeeOptions,
          },
        ])
        //   Once prompts are asked - take response and run SQLquery with defined values in array created of response
        .then((response) => {
          const SQLquery = `UPDATE employee SET role_id= ?, manager_id= ? WHERE id=?`;
          db.query(SQLquery, [response.role, response.manager, response.employee], (err, res) => {
            if (err) throw err;
            console.log(
              `\n Succefully updated role. ${res.affectedRows} record(s) updated.\n`
            );
            // Run userOptions() to go back to initial list of database options
            userOptions();
          });
        });
    });
  });
};

// Function to view all roles
let viewAllRoles = () => {
  const SQLquery = `
    SELECT role.title AS 'Role', role.id AS 'Role ID', department.name AS 'Department', role.salary AS 'Salary'
    FROM role
    JOIN department
    ON role.department_id = department.id
    ORDER BY role.id;
    `;

  db.query(SQLquery, (err, res) => {
    if (err) throw err;
    console.log("\nAll Roles: \n");
    console.table(res);
    userOptions();
  });
};

// Function to add a role
let addRole = () => {
// SQL query to get all departments and push into an array of department options to be used in inquirer list choices
  let departments = [];
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;

    res.forEach((department) => {
      let departmentObject = {
        name: department.name,
        value: department.id,
      };
      departments.push(departmentObject);
    });
    // Inquirer prompts to specify role details tobe added
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter New Position title",
          name: "roleTitle",
          validate: function (roleTitle) {
            if (!roleTitle) {
              console.log("Please enter a position title");
              return false;
            }
            return true;
          },
        },
        {
          type: "input",
          message: "Enter Position Salary",
          name: "roleSalary",
          validate: function (roleSalary) {
            if (isNaN(roleSalary)) {
              console.log("Please enter a numeric salary");
              return false;
            }
            return true;
          },
          filter: function (roleSalary) {
            if (isNaN(roleSalary)) {
              input = "";
            } else {
              return roleSalary;
            }
          },
        },
        {
          type: "list",
          message: "Which Department Does This Position Fall Into?",
          name: "department",
          choices: departments,
        },
      ])
    // Once questions are answered - take the response and run the specified SQL query using the values in the below response array
      .then((response) => {
        const SQLquery = `INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`;
        db.query(
          SQLquery,
          [response.roleTitle, response.roleSalary, response.department],
          (err, res) => {
            if (err) throw err;
            console.log(`\nSuccesfully add ${response.roleTitle}\n`);
            userOptions();
          }
        );
      });
  });
};

// Function to view all Departments
let viewAllDepartments = () => {
  const SQLquery = `
    SELECT id AS 'Department ID', name AS 'Department'
    FROM department
    ORDER BY department.id;
    `;

  db.query(SQLquery, (err, res) => {
    if (err) throw err;
    console.log("\nAll Departments \n");
    console.table(res);
    userOptions();
  });
};

// Function to add a new Department
let addDepartment = () => {
    // Inquirer Prompts to collect details for new department
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter New Department Name",
        name: "deptName",
        validate: function (deptName) {
          if (!deptName) {
            console.log("Please enter a department name");
            return false;
          }
          return true;
        },
      },
    ])
    // Using inquirer responses run SQL query to insert into department table using the response value
    .then((response) => {
      const SQLquery = `INSERT INTO department (name) VALUES (?)`;
      let value = response.deptName;
      db.query(SQLquery, value, (err, res) => {
        if (err) throw err;
        console.log(
          `Successfully inserted ${response.deptName} into database.`
        );
        // Function to launch initial usuer Options
        userOptions();
      });
    });
};

// Function to view all employees linked to each manager
viewManagerEmployees = () =>{
    const SQLquery = `
    SELECT e.manager_id AS 'Manager ID',
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',
    CONCAT(e.first_name, ' ', e.last_name) AS 'Employee Name'
    FROM employee AS e
    LEFT JOIN employee as m ON e.manager_id = m.id
    JOIN role
    ON e.role_id = role.id
    WHERE e.manager_id IS NOT NULL
    ORDER BY m.id;
    `;
    db.query(SQLquery, (err, res) => {
        if (err) throw err;
        console.log(`\n All Manager Employees`);
        console.table(res);
        console.log("\n =================== \n");
        userOptions();
    })
}

// Function to view all employees under each department
viewEmployeeDepartment = () => {
  const SQLquery = `
    SELECT  department.name AS 'Department', 
    CONCAT( last_name,' ', first_name) AS 'Name'
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY department.name;
        `;
  db.query(SQLquery, (err, res) => {
    if (err) throw err;
    console.log(`\n Department Employees`);
    console.table(res);
    console.log("\n =================== \n");
    userOptions();
  });
};

// Function to remove a department
removeDepartment = () => {
    // Run a query to get a full list of departments and push into an array to be used for inquirer list choices
  let departments = [];
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;

    res.forEach((department) => {
      let departmentObject = {
        name: department.name,
        value: department.id,
      };
      departments.push(departmentObject);
    });
    // Inquirier prompts to specify which department will be removed
    inquirer
      .prompt({
        type: "list",
        message: "Which department do you want to remove?",
        name: "deptToRemove",
        choices: departments,
      })
    //   Using response - run SQL command to remove the department using the value from the response
      .then((response) => {
        const SQLquery = `DELETE FROM department WHERE id = ?`;
        db.query(SQLquery, [response.deptToRemove], (err, res) => {
          if (err) throw err;
          console.log(`Succesfully removed ${response.deptToRemove}. ${res.affectedRows} record(s) updated.`);
        //   Function to run intial useroptions
          userOptions();
        });
      });
  });
};
// Function to remove a role
removeRole = () => {
    // Run SQL query to get a list of all roles and push into an array of roles to be used for inquirer list choices
  let roleOptions = [];
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    res.forEach(({ title, id }) => {
      roleOptions.push({
        name: title,
        value: id,
      });
    });
    // Inquirer prompt questions to specify details of role to be removed
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which role do you want to remove?",
          name: "roleToRemove",
          choices: roleOptions,
        },
      ])
    //   Use response to run a SQL command to remove the specified role
      .then((response) => {
        const SQLquery = `DELETE FROM role WHERE id = ?`;
        db.query(SQLquery, [response.roleToRemove], (err, res) => {
          if (err) throw err;
          console.log(`\nSuccesfully removed ${response.roleToRemove}. ${res.affectedRows} record(s) updated. \n`);
    //   Function to run intial useroptions
          userOptions();
        });
      });
  });
};
// Function to remove an employee
removeEmployee = () => {
// Run SQL query to get a list of all employees and push into an array of employees to be used for inquirer list choices
  let employeeOptions = [];
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    res.forEach(({ first_name, last_name, id }) => {
      employeeOptions.push({
        name: first_name + " " + last_name,
        value: id,
      });
    });
// Inquirer prompt questions to specify details of employee to be removed
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which Employee Would You Like To Remove?",
          name: "employeeToRemove",
          choices: employeeOptions,
        },
      ])
//   Use response to run a SQL command to remove the specified employee
      .then((response) => {
        const SQLquery = `DELETE FROM employee WHERE id = ?`;
        db.query(SQLquery, [response.employeeToRemove], (err, res) => {
          if (err) throw err;
          console.log(`\nSuccesfully removed ${response.employeeOptions}. ${res.affectedRows} record(s) updated. \n`);
    //   Function to run intial useroptions
          userOptions();
        });
      });
  });
};

// Function to view departments total utilized budget 
viewDepartmentBudget = () => {
  db.query(
    `
    SELECT department_id AS 'Department ID',
    department.name AS 'Department',
    SUM(salary) AS 'Total Salary Costs'
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee ON employee.role_id = role.id
    GROUP BY department_id
    ORDER BY department_id;
    `,
    (err, res) => {
      if (err) throw err;
      console.log("\nCurrent Department Budgets\n");
      console.table(res);
      userOptions();
    }
  );
};
