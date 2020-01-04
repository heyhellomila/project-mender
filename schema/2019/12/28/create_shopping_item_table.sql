create table shopping_items(
    id bigint AUTO_INCREMENT PRIMARY KEY,
	work_order_id bigint NOT NULL,
	name varchar(36) NOT NULL,
	quantity bigint NOT NULL,
	price bigint NOT NULL,
	bought bit NOT NULL,
    FOREIGN KEY (work_order_id) 
		REFERENCES work_orders(id)
);
