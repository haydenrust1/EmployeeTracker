DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE job (
    id INT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10,2) UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_id INT UNSIGNED NOT NULL,
    manager_id INT UNSIGNED,
    PRIMARY KEY (id)
);

INSERT INTO department (name) 
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO job (title, salary, department_id)
VALUES ("Sales Lead", 100000, (SELECT id FROM department where name = "Sales")),
("Salesperson", 80000, (SELECT id FROM department where name = "Sales")), 
("Lead Engineer", 150000, (SELECT id FROM department where name = "Engineering")),
("Software Engineer", 120000, (SELECT id FROM department where name = "Engineering")),
("Accountant", 125000, (SELECT id FROM department where name = "Finance")),
("Human Relations", 100000,(SELECT id FROM department where name = "Legal")),
("Lawyer", 100000, (SELECT id FROM department where name = "Finance"));

INSERT INTO employee (first_name, last_name, job_id)
VALUES ("John", "Doe", (SELECT id FROM job where title = "Sales Lead")), 
("Mike", "Chan",(SELECT id FROM job where title = "Salesperson")), 
("Ashley", "Rodriguez",(SELECT id FROM job where title = "Lead Engineer")), 
("Kevin", "Tupik",(SELECT id FROM job where title = "Software Engineer")),
("Malia", "Brown",(SELECT id FROM job where title = "Accountant")), 
("Sarah", "Lourd",(SELECT id FROM job where title = "Legal Team Lead")), 
("Tom", "Allen",(SELECT id FROM job where title = "Lawyer"));

UPDATE employee
SET manager_id = 3
WHERE id = 1;
UPDATE employee
SET manager_id = 3
WHERE id = 4;
UPDATE employee
SET manager_id = 6
WHERE id = 7;
UPDATE employee
SET manager_id = 1
WHERE id = 2;

SELECT * FROM department;
SELECT * FROM job;
SELECT * FROM employee;
