create table work_order_status(
    id int AUTO_INCREMENT PRIMARY KEY,
    status ENUM('CANCELLED','COMPLETED', 'ISSUED', 'OPEN_FOR_QUOTE', 'QUOTE_RECEIVED') NOT NULL UNIQUE
);

ALTER TABLE work_orders
  ADD work_order_status_id int NOT NULL;

UPDATE work_orders SET work_order_status_id = '1';

ALTER TABLE work_orders
  ADD CONSTRAINT work_orders_ibfk_7
    FOREIGN KEY (work_order_status_id) REFERENCES work_order_status(id);

INSERT INTO work_order_status (status) VALUES ('CANCELLED'), ('COMPLETED'), ('ISSUED'),
    ('OPEN_FOR_QUOTE'), ('QUOTE_RECEIVED');