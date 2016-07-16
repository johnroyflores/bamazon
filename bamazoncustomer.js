var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bamazon'
});

//table constructor
var table = new Table({ head: ["", "itemID", "Product Name", "Department Name", "Price", "Stock Quantity"] });





connection.connect();
// creates table from data within products
drawTable();


function drawTable() {
    connection.query('SELECT * FROM products', function(error, results, fields) {
        for (var i = 0; i < results.length; i++) {
            table.push({ "": [results[i].itemID, results[i].ProductName, results[i].DepartmentName, results[i].Price, results[i].StockQuanitity] });
        }
        console.log(table.toString());
        order();

    });
}

//order();
// connection.end();

// Queries the user to determine order and amount
function order() {
    var questions = [{
        type: 'input',
        name: 'item',
        message: 'What item would you like to purchase?(itemID)'
    }, {
        type: 'input',
        name: 'amount',
        message: 'How Many?',
        default: function() {
            return 1;
        }
    }];

    inquirer.prompt(questions).then(function(answers) {
        //console.log(JSON.stringify(answers, null, '  '));
        //console.log(answers.item);
        //return answers;
//if the amount they desire is in stock, give it to them and update the database
        if (results[parseInt(answers.item)].StockQuanitity < parseInt(answers.amount)) {
            console.log("That amount isn't valid. Please try again.");
            order();
        } else {
            buyIt(parseInt(answers.item), parseInt(answers.amount));
        }
    });



}
//updates the database and redraws the table
function buyIt(what, quan) {
    connection.query('UPDATE products SET ? WHERE ?', [{ StockQuanitity: (results[what].StockQuanitity - quan) }, { id: what }], function(err, result) {
        console.log((results[what].StockQuanitity));
        drawTable();
    });
}





