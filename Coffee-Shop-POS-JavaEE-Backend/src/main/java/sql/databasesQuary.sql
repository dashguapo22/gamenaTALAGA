-- Active: 1755963326701@@127.0.0.1@3306


use coffee_shop_pos;






create table OrderDetails(
    order_id varchar(50),
    pro_id varchar(25),
    qty varchar(25),
    unitPrice varchar(25),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (pro_id) REFERENCES Product(pro_id)
);

create table history(
    order_id varchar(50) PRIMARY KEY,
    dateAndTime DateTime,
    contact varchar(10),
    FOREIGN KEY (contact) REFERENCES Customer(contact)
);

