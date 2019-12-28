create table business_users(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    business_user_role_id int NOT NULL,
    user_id bigint NOT NULL,
    business_id bigint NOT NULL,
    FOREIGN KEY (business_user_role_id) REFERENCES business_user_roles(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (business_id) REFERENCES businesses(id)
)