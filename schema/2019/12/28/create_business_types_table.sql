create table business_types(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('INDEPENDENT', 'BUSINESS') NOT NULL UNIQUE
);

insert into business_types (type) VALUES ('INDEPENDENT'), ('BUSINESS');