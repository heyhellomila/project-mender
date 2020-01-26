create table businesses(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    NEQ bigint UNIQUE NOT NULL,
    name varchar(120),
    business_type_id int NOT NULL,
    FOREIGN KEY (business_type_id) REFERENCES business_types(id)
);

insert into businesses (NEQ, name, business_type_id) VALUES (0, 'INDEPENDENT', 1);