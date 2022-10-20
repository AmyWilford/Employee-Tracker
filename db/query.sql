-- VIEW ALL EMPLOYEES:
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

-- VIEW EMPLOYEES BY MANAGER
SELECT CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',
    CONCAT(e.first_name, ' ', e.last_name) AS 'Employee Name',
    e.manager_id AS 'Manager ID'
    FROM employee AS e
    LEFT JOIN employee as m ON e.manager_id = m.id
    JOIN role
    ON e.role_id = role.id
    WHERE e.manager_id IS NOT NULL
    ORDER BY m.id;
    
-- VIEW ALL ROLES:
SELECT role.title AS 'Role', role.id AS 'Role ID', department.name AS 'Department', role.salary AS 'Salary'
FROM role
JOIN department
ON role.department_id = department.id
ORDER BY role.id;

-- VIEW ALL DEPARTMENTS
 SELECT id AS 'Department ID', name AS 'Department'
 FROM department
 ORDER BY department.id;

-- ADD DEPARTMENT
INSERT INTO department(name)
VALUES  ('department');

-- VIEW EMPLOYEE DEPARTMENTS
SELECT  department.name AS 'Department', 
    CONCAT( last_name,' ', first_name) AS 'Employee Name'
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY department.name;

-- VIEW DEPARTMENT BUDGETS
SELECT department_id AS 'Department ID',
    department.name AS 'Department',
    SUM(salary) AS 'Total Salary Costs'
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee ON employee.role_id = role.id
    GROUP BY department_id;

