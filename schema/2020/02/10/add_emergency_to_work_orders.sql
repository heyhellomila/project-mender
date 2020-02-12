ALTER TABLE work_orders ADD column emergency bit;
ALTER TABLE work_orders MODIFY column emergency bit NOT NULL;