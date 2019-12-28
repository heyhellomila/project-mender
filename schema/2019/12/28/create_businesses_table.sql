create table businesses(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    NEQ bigint UNIQUE,
    name varchar(120),
    business_type_id int NOT NULL,
    FOREIGN KEY (business_type_id) REFERENCES business_types(id)
);