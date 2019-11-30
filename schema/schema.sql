create table priority_types(
    id int AUTO_INCREMENT PRIMARY KEY,    
    type ENUM('HIGH','MEDIUM', 'LOW') NOT NULL UNIQUE
);

create table property_types(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('CONDOMINIUM','SINGLE_FAMILY_HOME', 'TOWNHOUSE',
    'DUPLEX', 'TRIPLEX', 'MULTIPLEX', 'COTTAGE', 'MOBILE_HOME') NOT NULL UNIQUE
);

create table sectors(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    type varchar(255) NOT NULL,
    kind varchar(255) NOT NULL,
    UNIQUE(type, kind)
);

create table activity_status(
    id int AUTO_INCREMENT PRIMARY KEY,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL UNIQUE
);

create table user_types(
    id int AUTO_INCREMENT PRIMARY KEY,
    type ENUM('HOMEOWNER', 'INSPECTOR', 'CONTRACTOR', 'HYBRID') NOT NULL UNIQUE
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
    activity_status_id int NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users(id),
    FOREIGN KEY (property_type_id)
        REFERENCES property_types(id),
    FOREIGN KEY (activity_status_id)
        REFERENCES activity_status(id)
);

create table property_sectors(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    property_id bigint NOT NULL,
    sector_id bigint NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    FOREIGN KEY (property_id) REFERENCES  properties(id),
    FOREIGN KEY (sector_id) REFERENCES sectors(id),
    UNIQUE(property_id, sector_id)
);

create table work_orders(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    property_id bigint NOT NULL,
    sector_id bigint NOT NULL,
    work_order_type_id int NOT NULL,
    title varchar(36) NOT NULL,
    cause varchar(36) NOT NULL,
    service_needed bit NOT NULL,
    priority_type_id int NOT NULL,
    description varchar(180),
    due_date DATETIME NOT NULL,
    created_date DATETIME NOT NULL,
    created_by bigint NOT NULL,
    last_modified_date DATETIME,
    last_modified_by bigint,
    date_completed DATETIME,
    price_estimate BIGINT,
    actual_cost BIGINT,
    FOREIGN KEY (property_id)
        REFERENCES properties(id),
    FOREIGN KEY (sector_id)
        REFERENCES sectors(id),
    FOREIGN KEY (work_order_type_id)
        REFERENCES work_order_types(id),
    FOREIGN KEY (priority_type_id)
        REFERENCES priority_types(id),
    FOREIGN KEY (created_by)
        REFERENCES users(id),
    FOREIGN KEY (last_modified_by)
        REFERENCES users(id)
);

insert into priority_types (type) VALUES ('LOW'), ('MEDIUM'), ('HIGH');

insert into property_types (type) VALUES ('CONDOMINIUM'), ('SINGLE_FAMILY_HOME'), 
    ('TOWNHOUSE'), ('DUPLEX'), ('TRIPLEX'), ('MULTIPLEX'), ('COTTAGE'), ('MOBILE_HOME');

insert into sectors (type, kind) VALUES ('BUILDING', 'ROOF'), ('BUILDING', 'ENVELOPE'),
                                        ('BUILDING', 'GARAGE'), ('BUILDING', 'WINDOWS & DOORS'),
                                        ('BUILDING', 'INSULATION'), ('ELECTRICITY', 'ELECTRICAL METER'),
                                        ('ELECTRICITY', 'ELECTRICAL PANEL AND WIRING'),
                                        ('ELECTRICITY', 'SWITCHES AND SOCKET OUTLET'),
                                        ('ELECTRICITY', 'LIGHTS'), ('ELECTRICITY', 'SOLAR PANEL'),
                                        ('STRUCTURE', 'FOUNDATION'), ('STRUCTURE', 'FRAMEWORK'),
                                        ('STRUCTURE', 'STAIRS'), ('EXTERIOR', 'LANDSCAPE'),
                                        ('EXTERIOR', 'PARKING SPACE'), ('EXTERIOR', 'DECKING'),
                                        ('EXTERIOR', 'SWIMMING POOL'), ('UTILITY', 'HOT WATER TANK'),
                                        ('UTILITY', 'PLUMBING'), ('UTILITY', 'MUNICIPAL WATER FEED'),
                                        ('UTILITY', 'MUNICIPAL SEWAGE'), ('UTILITY', 'GROUNDWATER SYSTEM'),
                                        ('UTILITY', 'WELL WATER'), ('HVAC', 'AIR EXCHANGER'),
                                        ('HVAC', 'HEAT PUMP'), ('HVAC', 'AIR CONDITIONING'),
                                        ('HVAC', 'CENTRAL SYSTEM'), ('HVAC', 'HOT WATER RADIATOR'),
                                        ('HVAC', 'FUEL OIL HEATING SYSTEM'), ('HVAC', 'GAS HEATING SYSTEM'),
                                        ('HVAC', 'AIR EXTRACTOR'), ('HVAC', 'HUMIDIFIER'),
                                        ('HVAC', 'FIREPLACE'), ('INTERIOR FINISH', 'WALLS'),
                                        ('INTERIOR FINISH', 'CEILING'), ('INTERIOR FINISH', 'FLOOR'),
                                        ('INTERIOR FINISH', 'CABINET'), ('INTERIOR FINISH', 'DOORS'),
                                        ('APPLIANCES AND FURNITURE', 'DISHWASHER'),
                                        ('APPLIANCES AND FURNITURE', 'REFRIGERATOR');

insert into activity_status (status) VALUES ('ACTIVE'), ('INACTIVE');

insert into user_types (type) VALUES ('HOMEOWNER'), ('INSPECTOR'), ('CONTRACTOR'), ('HYBRID');

insert into work_order_types (type) VALUES ('CM'), ('PM');