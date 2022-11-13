const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

app.get("/users", (req, res) => {
    console.log(req.query);
    // connect to database
    // query list all users
    // with placeholder
    connection.query(
        "SELECT * FROM test WHERE id = ?", [req.query.id],
        function(err, results) {
            console.log(results);
            // first check if there are results
            try {
                res.send(`Hi ${results[0].first_name}  ${results[0].last_name}!`);
            } catch (err) {
                res.send(`Error: ${err}!`);
            }
        }
    );
    // if(results) -> response all users
    // if(!results) -> response error message
});
//insert user
app.get("/insert", (req, res) => {
    console.log(req.query);
    connection.query(
        "INSERT INTO test (first_name, last_name, phone, address1, address2, email) VALUES ('Daniela', 'Ramos', '09277346233', 'zone 1 taguig city', 'greenvale homes imus', 'dnramos011@gmail.com')",

        function(err, remove) {
            console.log(remove);
            try {
                res.send("1 Record Inserted");
            } catch {
                res.send(`Error: ${err}!`);
            }
        }
    );
});
//delete user
app.get("/delete", (req, res) => {
    console.log(req.query);
    connection.query(
        "DELETE FROM test WHERE id = ? ", [req.query.id],
        function(err, remove) {
            console.log(remove);
            try {
                res.send("Successfully deleted");
            } catch {
                res.send(`Error: ${err}!`);
            }
        }
    );
});
// update user
app.get("/update", (req, res) => {
    console.log(req.query);
    connection.query(
        "UPDATE test SET first_name = 'error' WHERE first_name = ? ", [req.query.first_name],
        function(err, update) {
            console.log(update);
            try {
                res.send("Successfully Updated");
            } catch {
                res.send(`Error: ${err}!`);
            }
        }
    );
});

//refresh database
connection.query("SELECT * FROM `test` ", function(err, tables) {
    console.log(tables);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});