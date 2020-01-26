ALTER TABLE work_orders ADD contracted_by bigint;
ALTER TABLE work_orders ADD CONSTRAINT contracted_by FOREIGN KEY (contracted_by) REFERENCES business_users(id);