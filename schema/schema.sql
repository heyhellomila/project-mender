create table priority_types(
    id int AUTO_INCREMENT PRIMARY KEY,    
    type ENUM('HIGH','MEDIUM', 'LOW') NOT NULL UNIQUE
);

create table property_types(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('CONDOMINIUM','SINGLE_FAMILY_HOME', 'TOWNHOUSE',
    'DUPLEX', 'TRIPLEX', 'MULTIPLEX', 'COTTAGE', 'MOBILE_HOME') NOT NULL UNIQUE
);

create table sector_types(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('ROOF', 'KITCHEN', 'UTILITIES', 'LIVING_ROOM', 'BATHROOM',
    'APPLIANCES', 'BEDROOM', 'BALCONY', 'GARAGE', 'ENVELOPE', 'ELECTRICAL', 'HVAC') NOT NULL UNIQUE
);

create table status(
    id int AUTO_INCREMENT PRIMARY KEY,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL UNIQUE
);

create table user_types(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('HOMEOWNER', 'INSPECTOR', 'CONTRACTOR') NOT NULL UNIQUE
);

create table work_order_types(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('CM', 'PM') NOT NULL UNIQUE
);

create table users(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    email varchar(60) UNIQUE,
    password_hash varchar(60) NOT NULL,
    first_name varchar(36) NOT NULL,
    last_name varchar(36) NOT NULL,
    phone_number varchar(12) NOT NULL,
    user_type_id int NOT NULL,
    FOREIGN KEY (user_type_id)
        REFERENCES user_types(id)
);

create table properties(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    user_id bigint NOT NULL,
    property_type_id int NOT NULL,
    name varchar(36) NOT NULL,
    address varchar(100) NOT NULL,
    status_id int NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users(id),
    FOREIGN KEY (property_type_id)
        REFERENCES property_types(id),
    FOREIGN KEY (status_id)
        REFERENCES status(id)
);

create table work_orders(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    property_id bigint NOT NULL,
    sector_id int NOT NULL,
    work_order_type_id int NOT NULL,
    title varchar(36) NOT NULL,
    cause varchar(36) NOT NULL,
    service_needed BOOLEAN NOT NULL,
    priority_id int NOT NULL,
    description varchar(180),
    due_date DATE NOT NULL,
    created_date DATE NOT NULL,
    created_by bigint NOT NULL,
    last_modified_date DATE,
    last_modified_by bigint,
    date_completed DATE,
    price_estimate BIGINT,
    actual_cost BIGINT,
    FOREIGN KEY (property_id)
        REFERENCES properties(id),
    FOREIGN KEY (sector_id)
        REFERENCES sector_types(id),
    FOREIGN KEY (work_order_type_id)
        REFERENCES work_order_types(id),
    FOREIGN KEY (priority_id)
        REFERENCES priority_types(id),
    FOREIGN KEY (created_by)
        REFERENCES users(id),
    FOREIGN KEY (last_modified_by)
        REFERENCES users(id)
);

insert into priority_types (type) VALUES ('LOW'), ('MEDIUM'), ('HIGH');

insert into property_types (type) VALUES ('CONDOMINIUM'), ('SINGLE_FAMILY_HOME'), 
    ('TOWNHOUSE'), ('DUPLEX'), ('TRIPLEX'), ('MULTIPLEX'), ('COTTAGE'), ('MOBILE_HOME');

insert into sector_types (type) VALUES ('ROOF'), ('KITCHEN'), ('UTILITIES'), 
    ('LIVING_ROOM'), ('BATHROOM'), ('APPLIANCES'), ('BEDROOM'), ('BALCONY'), 
    ('GARAGE'), ('ENVELOPE'), ('ELECTRICAL'), ('HVAC');

insert into status (status) VALUES ('ACTIVE'), ('INACTIVE');

insert into user_types (type) VALUES ('HOMEOWNER'), ('INSPECTOR'), ('CONTRACTOR'), ('HYBRID');

insert into work_order_types (type) VALUES ('CM'), ('PM');