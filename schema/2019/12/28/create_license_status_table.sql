create table license_status(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('ACTIVE', 'RESTRICTED', 'SUSPENDED', 'CANCELLED') NOT NULL UNIQUE
);

insert into license_status (type) VALUES ('ACTIVE'), ('RESTRICTED'), ('SUSPENDED'), ('CANCELLED');