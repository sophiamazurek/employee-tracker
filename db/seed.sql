use employee_tracker_db;

-- data for department

INSERT INTO department (id, name)
VALUES (1, "HR");

INSERT INTO department (id, name)
VALUES (2, "IT");

INSERT INTO department (id, name)
VALUES (3, "Marketing");

INSERT INTO department (id, name)
VALUES (4, "Developer");

INSERT INTO department (id, name)
VALUES (5, "Director");

-- data for employeerole

INSERT INTO employeerole (id, title, salary, department_id)
VALUES (1, "HR",20000,2 );

INSERT INTO employeerole (id, title, salary, department_id)
VALUES (2, "IT",30000,3 );

INSERT INTO employeerole (id, title, salary, department_id)
VALUES (3, "Marketing",30000,3 );

INSERT INTO employeerole (id, title, salary, department_id)
VALUES (4, "Developer",30000,3 );

INSERT INTO employeerole (id, title, salary, department_id)
VALUES (5, "Director",30000,3 );

-- data for employee

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "John", "Smith", 123);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (2, "Bob", "Johnson", 134);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (3, "Joseph", "Mazurek", 145);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (4, "Ethan", "Barton", 156);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (5, "Sophia", "Werner", 167);

-- other data will go in when user inputs it