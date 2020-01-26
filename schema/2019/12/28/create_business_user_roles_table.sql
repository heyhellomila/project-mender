create table business_user_roles(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('EMPLOYEE', 'ADMIN') NOT NULL UNIQUE
);

insert into business_user_roles (type) VALUES ('EMPLOYEE'), ('ADMIN');
