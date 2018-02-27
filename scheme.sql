-- schema --

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `department_name` varchar(20) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `stock_quantity` int(11) DEFAULT '0',
  PRIMARY KEY (`item_id`);


-- seeds --

INSERT INTO products
  (product_name,department_name,price,stock_quantity)
VALUES
  ("Apple Iphone 6", "Tech", 600.00, 10),
  ("Apple Iphone 7", "Tech", 700.00, 15),
  ("Apple Iphone 8", "Tech", 800.00, 20),
  ("Apple Iphone X", "Tech", 900.00, 25),
  ("Diamond Ring", "Personal Stuff", 6000.00, 30),
  ("Bread", "Grocery", 3.00, 100),
  ("Milk", "Grocery", 5.00, 105),
  ("Polo Shirt", "Garments", 50.00, 100),
  ("Perfume Bottle", "Personal Stuff", 100.00, 10),
  ("Levys Jeans", "Garments", 40.00, 1);
