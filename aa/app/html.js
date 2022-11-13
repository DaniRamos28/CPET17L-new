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

app.use(express.urlencoded());

app.get("/", function(request, response, next) {
    response.send(
        `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    
    
    <div>
        <div class="container-fluid ">

    
    <!--CARD-------------------------------------------------------------------------------------------->            
                <div class="col-xl-12 main">
                    <div class="container-fluid text-center d-flex justify-content-center align-items-center"><br><br>
                        <div  class="col-xl-12" >
                                            
                            
                            <div class="jumbotron "><br>
                                <div class="card-body mt-5">
                                    <form method="POST" action="insert">
                                   
                                        <div class="form-row">
                                            <div class="col-12" >
                                            ADDING FORM
                                            </div>
                                            <div class=" col-12">
                                                <input type="text" class="form-control my-2 p-2" id="first_name" name="first_name" placeholder="first name">
                                            </div>
                                            <div class=" col-12">
                                                <input type="text" class="form-control my-2 p-2" id="last_name" name="last_name" placeholder="last  name">
                                            </div>
                                            <div class=" col-12">
                                                <input type="text" class="form-control my-2 p-2" id="phone" name="phone" placeholder="phone">
                                            </div>
                                            <div class=" col-12">
                                                <input type="text" class="form-control my-2 p-2" id="address1" name="address1" placeholder="address1">
                                            </div>
                                            <div class=" col-12">
                                                <input type="text" class="form-control my-2 p-2"  id="address2" name="address2" placeholder="address2">
                                            </div>
                                            <div class=" col-12">
                                            <input type="text" class="form-control my-2 p-2" id="email" name="email" placeholder="email">
                                            </div>

                                            <!--BUTTONS-------------------------------------------------------------------------------------------->
                                            <div class=" col-12">
                                                <button type="submit" id="submit" value="submit" class="btn btn-primary btn-block my-2 p-2">submit</button>
                                            </div>
                                           
                                        </div>
                              
                                        
                                    </form>
                                
                                    
                                    
                                
                                    
                                </div>
                            </div>
                            
                        
                        </div>
                        
                        
                    </div>
                    
                    
                </div>
                
            </div>
       
        </div>
    </div>
    
    
    
    
    
    
    
    
    `
    );
});
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var flash = require("express-flash");
var session = require("express-session");
var db = require("./database");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: "123456catr",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    })
);

app.use(flash());
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

app.get("/insert", function(req, res, next) {
    res.render("/insert", { title: "INSERT" });
});

app.post("/insert", function(req, res, next) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var phone = req.body.phone;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var email = req.body.email;

    var sql = `INSERT INTO test.test (first_name, last_name, phone, address1, address2, email) VALUES ('${first_name}', '${last_name}', '${phone}', '${address1}', '${address2}', '${email}')`;
    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log("record inserted");
        req.flash("success", "Data added successfully!");
        res.redirect("/");
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});