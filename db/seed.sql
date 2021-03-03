use employee_tracker_db;

INSERT INTO department (id, name)
VALUES (1, "HR");

INSERT INTO department (id, name)
VALUES (2, "Marketing");

INSERT INTO employeerole (id, title, salary, department_id)
VALUES (1, "Social Media Coord",20000,2 );