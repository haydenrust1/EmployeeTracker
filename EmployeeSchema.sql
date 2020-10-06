DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE job (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10,2) UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_index (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_id INT UNSIGNED NOT NULL,
    INDEX job_index (job_id),
    CONSTRAINT fk_job FOREIGN KEY (job_id) REFERENCES job(id) ON DELETE CASCADE,    
    manager_id INT UNSIGNED,
    INDEX manager_index (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

INSERT INTO department (name) 
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO job (title, salary, department_id)
VALUES ("Sales Lead", 180000, (SELECT id FROM department where name = "Sales")),
("Salesperson", 80000, (SELECT id FROM department where name = "Sales")), 
("Lead Engineer", 190000, (SELECT id FROM department where name = "Engineering")),
("Software Engineer", 120000, (SELECT id FROM department where name = "Engineering")),
("Accountant", 125000, (SELECT id FROM department where name = "Finance")),
("Human Relations", 100000,(SELECT id FROM department where name = "Legal")),
("Lawyer", 200000, (SELECT id FROM department where name = "Finance"));

INSERT INTO employee (first_name, last_name, job_id)
VALUES ("John", "Doe", (SELECT id FROM job where title = "Sales Lead")), 
("Madison", "Rust",(SELECT id FROM job where title = "Salesperson")), 
("Hayden", "Rust",(SELECT id FROM job where title = "Lead Engineer")), 
("Kevin", "Soule",(SELECT id FROM job where title = "Software Engineer")),
("Delaney", "O'Haver",(SELECT id FROM job where title = "Software Engineer")),
("Emiley", "Grose",(SELECT id FROM job where title = "Accountant")), 
("Tim", "Salz",(SELECT id FROM job where title = "Human Relations")), 
("Josh", "Hamilton",(SELECT id FROM job where title = "Lawyer"));

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
