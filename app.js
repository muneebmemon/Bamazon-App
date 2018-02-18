var inquirer = require("inquirer");
var mysql = require("mysql");
var item_id;
var stock_available;
var item_price;
var qnty_to_purchase;
var item_name;

// setting up database connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3360,
  user: "root",
  password: "",
  database: "bamazon"
});

// making a database connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  // calling function to display items
  displayAllProducts();
});

// this function displays all products info (i.e. Price and Name) to the screen
function displayAllProducts() {
  connection.query("SELECT * FROM products", function(err, data) {
    if (err) {
      console.error("error executing sql query: " + err.stack);
      return;
    }

    data.forEach( product => {
      console.log(`${product.item_id} - ${product.product_name}, PRICE: $${product.price}`);
    });

    // calling function to display options for making a purchase
    askPurchaseQuestions();
  });
}

// this function asks customer what item and quantity of item they would like to buy and then checks stock quantity
// to make sure enough quantity is in stock to satisfy customer's order
function askPurchaseQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID of the product you want to purchase ? ",
        name: "itemId"
      },
      {
        type: "input",
        message: "How many units you want to buy ? ",
        name: "itemUnits"
      }
    ])
    .then( answer => {
        item_id = answer.itemId;
        qnty_to_purchase = answer.itemUnits;
        fetchStockQuantity ();
    });
}

// this function completes purchase by updating quantity in database and displaying purchase amount to customer
function doPurchaseItem () {
  connection.query("UPDATE products SET ? WHERE ?",[
      {
        stock_quantity : stock_available - qnty_to_purchase
      },
      {
        item_id : item_id
      }
    ], 
    ( err, data ) => {
      if (err) {
        console.log("Unable to complete transaction due to error.");
        throw err;
        return;
      }
      console.log(`\nPurchase completed. Here is the summary of your order.`);
      console.log(`\n1. ${item_name} Price: $${item_price} x ${qnty_to_purchase} = $${item_price*qnty_to_purchase}\n`);
      connection.end();
    }
  );
}

// this function fetch and return stock quantity of a selected item from database
function fetchStockQuantity () {
  var ql = connection.query(
    "SELECT stock_quantity,price,product_name FROM products WHERE ?",
    {
      item_id: item_id
    },
    (err, data) => {
        if (err) {
          throw err;
          return;
        }
        stock_available = +data[0].stock_quantity;
        item_price = +data[0].price;
        item_name = data[0].product_name;

        //checks to see if there is enough quantity to satisfy customer's purchase
        if (qnty_to_purchase > stock_available) {
          console.log(`Sorry there is not enough quantity to satisfy your order. Stock available ${stock_available} units.`);
        }else {
          //if there is enough quantity then calling function to complete purchase
          doPurchaseItem ();
        }
    }
  );
}