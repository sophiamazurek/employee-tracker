create database employee_tracker_db;

use employee_tracker_db;

CREATE TABLE department (
    id int AUTO_INCREMENT,
    name varchar(30),
    PRIMARY KEY (id)
);

CREATE TABLE employeerole (
    id int AUTO_INCREMENT,
    title varchar(30),
    salary decimal,
    department_id int,
    constraint fk_department foreign key (department_id) references department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id int AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,     
    constraint fk_role foreign key (role_id) references employeerole(id),
    manager_id int,
    constraint fk_manager foreign key (manager_id) references employee(id),
    PRIMARY KEY (id)
);