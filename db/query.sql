-- VIEW ALL EMPLOYEES:
-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
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

-- ADD EMPLOYEE:
-- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (?,?,?,?)

-- UPDATE EMPLOYEE ROLE:
-- THEN I am prompted to select an employee to update and their new role and this information is updated in the database 


-- VIEW ALL ROLES:
-- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
SELECT role.title AS 'Role', role.id AS 'Role ID', department.name AS 'Department', role.salary AS 'Salary'
FROM role
JOIN department
ON role.department_id = department.id
ORDER BY role.id;

-- ADD ROLES:
-- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database


-- VIEW ALL DEPARTMENTS
-- THEN I am presented with a formatted table showing department names and department ids
 SELECT id AS 'Department ID', name AS 'Department'
 FROM department
 ORDER BY department.id;

-- ADD DEPARTMENT
-- THEN I am prompted to enter the name of the department and that department is added to the database
INSERT INTO department(name)
VALUES  ('department');

-- VIEW EMPLOYEES BY MANAGER


-- VIEW EMPLOYEE DEPARTMENTS
-- WHY DUPLICATIN DATA
SELECT employee.last_name AS 'Last Name', 
    employee.first_name AS 'First Name', 
    department.name AS 'Department'
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id
    ORDER BY employee.last_name;

-- VIEW DEPARTMENT BUDGETS
-- SELECT department_id AS 'Department ID',
--     name AS 'Department',
--     SUM(salary) AS 'BUDGET'
--     FROM role
--     JOIN department ON role.department_id = department.id;
--     GROUP BY id;
