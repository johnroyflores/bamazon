var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');
var item;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bamazon'
});


var table = new Table({ head: ["", "itemID", "Product Name", "Department Name", "Price", "Stock Quantity"] });





connection.connect();

drawTable();
connection.query('UPDATE products SET ? WHERE ?', [{ StockQuanitity: (1) }, { id: what }], function(err, result) {
        console.log((results[what].StockQuanitity));
        drawTable();
    });

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

        if (results[parseInt(answers.item)].StockQuanitity < parseInt(answers.amount)) {
            console.log("That amount isn't valid. Please try again.");
            order();
        } else {
            buyIt(parseInt(answers.item), parseInt(answers.amount));
        }
    });



}

function buyIt(what, quan) {
    connection.query('UPDATE products SET ? WHERE ?', [{ StockQuanitity: (results[what].StockQuanitity - quan) }, { id: what }], function(err, result) {
        console.log((results[what].StockQuanitity));
        drawTable();
    });
}




// [ RowDataPacket {
//     itemID: 1,
//     ProductName: 'bananas',
//     DepartmentName: 'produce',
//     Price: 1,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 2,
//     ProductName: 'oranges',
//     DepartmentName: 'produce',
//     Price: 2,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 3,
//     ProductName: 'paper towels',
//     DepartmentName: 'GM',
//     Price: 3,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 4,
//     ProductName: 'toilet paper',
//     DepartmentName: 'GM',
//     Price: 2,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 5,
//     ProductName: 'chia seeds',
//     DepartmentName: 'Healthy Living',
//     Price: 3,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 6,
//     ProductName: 'coldbrew concentrate',
//     DepartmentName: 'Healthy Living',
//     Price: 6,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 7,
//     ProductName: 'cacao nibs',
//     DepartmentName: 'Healthy Living',
//     Price: 4,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 8,
//     ProductName: 'chorizo',
//     DepartmentName: 'Market',
//     Price: 3,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 9,
//     ProductName: 'contact lens solution',
//     DepartmentName: 'drugstore',
//     Price: 6,
//     StockQuanitity: 100 },
//   RowDataPacket {
//     itemID: 10,
//     ProductName: 'condoms',
//     DepartmentName: 'drugstore',
//     Price: 6,
//     StockQuanitity: 100 } ]
