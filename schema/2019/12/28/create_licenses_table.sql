create table licenses(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    license_number bigint NOT NULL,
    user_id bigint NOT NULL,
    license_type_id int NOT NULL,
    license_status_id int NOT NULL,
    expiry_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (license_type_id) REFERENCES license_types(id),
    FOREIGN KEY (license_status_id) REFERENCES license_status(id),
    CONSTRAINT unique_number_type UNIQUE (license_number, license_type_id)
);