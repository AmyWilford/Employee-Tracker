-- VIEW ALL EMPLOYEES:
-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
-- >>> QUESTION: HOW TO ACCESS MANAGER NAME
SELECT employee.id AS 'Employee ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Role', department.name AS 'Department', role.salary AS 'Salary'
FROM employee
JOIN role
ON employee.role_id = role.id
JOIN department
ON role.department_id = department.id
ORDER BY employee.id;

-- ADD EMPLOYEE:
-- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
-- >>> QUESTION: HOW TO ADD MANAGER?
INSERT INTO employee (first_name, last_name, role)
    VALUES

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