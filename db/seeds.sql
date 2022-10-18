INSERT INTO department(name)
VALUES  ('Research'), 
        ('Slayage'), 
        ('Maintenance'), 
        ('Consultants');

INSERT INTO role (title, salary, department_id)
VALUES  ('Slayer', 50000, 2),
        ('Watcher', 60000, 1), 
        ('Researcher', 40000, 1),
        ('Maintenance', 40000, 3), 
        ('Deamon Consultant', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Buffy', 'Summers', 1, 2), 
        ('Rupert', 'Giles', 2, null),
        ('Willow', 'Rosenberg', 3, 2),
        ('Zander', 'Harris', 4, 1), 
        ('Anya', 'Jenkins', 5, 1);
