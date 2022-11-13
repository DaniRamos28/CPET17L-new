const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const db = "cpet17l";
const db_table = "motion";
const bodyParser = require('body-parser')




const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: `${db}`,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' }));
 app.post('/capture', (req, res)=> {
  var {date_time, capture} = req.body;
  connection.query(`INSERT INTO ${db_table} (date_time, capture) VALUES (?, ?);`,
  [date_time, capture],
  (err, result)=>{
    try {
      if (result.affectedRows > 0) {
        res.json({data: "Success"});
      } else {
        res.json({message: "Error"});
      }
    } catch {
      res.json({message: err});
    }
  })
 })


app.get('/render-image', (req, res)=> {
  // Select the last entry from the db
  let list = [];
  connection.query(`SELECT * FROM ${db_table} ORDER BY id ASC;`,
  (err, results)=> {
    try {
      if (results.length > 0) {
        for ( i=0; i<results.length; i++ ) {
          list.unshift(results[i])
        }
        // send a json response containg the image data (blob)
        res.json({'images': list});

            
      } else {
        res.json({ message: "Something went wrong." });
      }
      } catch {
          res.json({ message: err });
      }
  })
})
app.get('/data', (req, res)=> {
  // Select the last entry from the db
  connection.query(`SELECT * FROM ${db_table} ORDER BY id DESC;`,
  (err, results)=> {
      try {
          if (results.length > 0) {
            let new_result = [];
            for (let i = 0; i < results.length; i++) {
                new_result.push({
                    capture: new Buffer.from({'imgData': results[i]['capture']}, 'base64').toString("utf8"),
                })
            }
            res.json(new_result)
      } else {
        res.json({ message: "Something went wrong." });
      }
      } catch {
          res.json({ message: err });
      }
  })
})


