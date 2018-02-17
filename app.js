var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3360,
  user: "root",
  password: "mypassword1927",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  connection.query("SELECT * FROM products", function(err, data){
    if (err) {
      console.error("error executing sql query: " + err.stack);
      return;
    }

    data.forEach(product => {
        console.log(`${product.item_id} - ${product.product_name}, PRICE: $${product.price}`);
    });
  });

});

