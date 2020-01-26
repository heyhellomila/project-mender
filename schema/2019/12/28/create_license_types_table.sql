create table license_types(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('RBQ', 'IBQ') NOT NULL UNIQUE
);

insert into license_types (type) VALUES ('RBQ'), ('IBQ');